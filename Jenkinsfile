genericPipeline{
  def PUBLIC_FOLDER = "app-example"
  env.PUBLIC_PATH = "${PUBLIC_FOLDER}"

  // Digital Analytics
  env.UBX_CAPTURE_PATH = '//lib-us-3.brilliantcollector.com/common/ubxCapture.js'
  env.UBX_CLIENT_ID = '85400000'
  // depending on stream SITE_ID should be changed to ‘CMS’, ‘CUI’, ‘DA’ etc…
  env.DA_SITE_ID = 'CMS'
  env.UBX_TLD = 'goacoustic.com'
  env.UBX_C_ID = 'af6ec148-1c76-4eba-a104-90b931128353'
  // END: Digital Analytics

  sonarQubeEnabled = isPR || branchName in deployBranches
  sonarQubeServerName = "AcousticSonarQube"
  qualityGateTimeoutMinute = 60
  sonarQubeAdditionalProperties = {[
    "sonar.java.binaries":env.WORKSPACE,
    "sonar.sources":env.WORKSPACE,
    "sonar.inclusions":"src/**/*.js,src/**/*.jsx",
    "sonar.exclusions":"src/*.js, src/*.jsx, src/**/*.test.js, src/**/*.test.jsx, src/**/*.mock.js, src/**/index.js, src/**/test*",
    "sonar.javascript.lcov.reportPaths":"coverage/lcov.info"
  ]}

  buildCommand = {
      sh '''
         sed -i -e "s#/api/npm/.*-npm-virtual#/api/npm/cui-shell-npm-virtual#" yarn.lock
         yarn install
         yarn build:prod
      '''

      withCredentials([usernameColonPassword(credentialsId: scmCredentialId, variable: 'GIT_CREDENTIALS')]) {
        sh "rm -f .env.semantic.release"
        sh "yarn semantic-release --dry-run"
        if (fileExists('.env.semantic.release')) {
          // set project version
          echo "Loading .env.semantic.release"
          load ".env.semantic.release"
          echo "New release version ${env.projectVersion}"
          isRelease = true
          sonarQubeEnabled = true
          uploadArtifactEnabled = true
          deployStaticResourcesEnabled = branchName in deployBranches
        } else {
          echo "No new version is released"
        }
      }
  }

  unitTestCommand = {
    sh '''
       yarn lint
       yarn test --watchAll=false
    '''
  }

  checkoutAdditionalCommand = {
    withCredentials([usernamePassword( credentialsId: 'aws.okta.appid', usernameVariable: 'OKTA_USERNAME', passwordVariable: 'OKTA_PASSWORD')]) {
      withCredentials([file(credentialsId: "okta.aws.config", variable: 'FILE')]) {
        sh 'cp -f $FILE ~'
      }
      withEnv(["AWS_DEFAULT_REGION=us-east-1", "AWS_ROLE=arn:aws:iam::785861695266:role/DevelopmentCommonServices_Full-Administrator"]){
        sh '''
          gimme-aws-creds --roles $AWS_ROLE
        '''
      }
    }
    withCredentials([file(credentialsId: 'npmrc.cuishell', variable: 'NPMRC')]) {
      sh '''
        mv $NPMRC ~/.npmrc
      '''
    }
  }

  //enable only for repos that deploy static resources
  deployStaticResourcesEnabled = false
  deployStaticResourcesSource = "build"
  deployStaticResourcesProduct = "app_example"
  deployStaticResourcesModuleName = "cui-react-application"
  deployStaticResourcesVersion = {"${env.projectVersion}"}
  
  e2eEnabled = branchName in ["master"]
  
}
