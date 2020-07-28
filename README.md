# cui-react-application

Seed application for acoustic applications and modules.

## Pre Requirements

- Nodejs
- Yarn

## How To Start

```bash
yarn install
```

### Production

```bash
yarn start
```

### Develop

```bash
yarn start:dev
```

## Available Scripts

- `yarn start` - Runs the app in the production mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `yarn start:dev` - Same as `yarn start` but runs in development mode.
- `yarn build` - Builds the app for production to the `build` folder.
- `yarn build:dev` - Builds the app for development to the `build` folder.
- `yarn lint` - Linting project using eslint and prettier
- `yarn format` - Runs `prettier on scss,css,js,jsx,md,ts` files.
- `yarn test` - Launches the test runner.

## Dual build

This application starter offers builds for both cases of package types - root application and a module.

### Creating a module

Modules are imported into root application. They expose a contract that is common for that type of artifacts.
In order to develop a module, all files that are expected to be bundled, need to be imported in `src/index.js`.
Default set of dependencies is adjusted towards 'module' type, as these are much more often expected to be created.

##### Usage

Run `--config-name module` with any of the yarn/webpack commands, to work only with module version of the package, e.g. `yarn build:dev --config-name module`

##### Output

Module root file `index.js` will be available in _/build_ folder after bundling finishes. It should be imported by other module/application.

### Creating an application

Applications pull in set of of modules and work as a standalone base of imported dependencies.
In order to keep up a valid package dependencies to create 'application', all of the peer dependencies listed, need to be moved
to dependencies list. That way they will be included in final package without any exclusions.

Reason for this behavior is to have very light modules floating around root app, which just pulls them in.
They are stripped of any additional code, so all vendor and 3rd party dependencies are applied in the root.

##### Usage

Use `--config-name application` to develop application level bundle, e.g.`yarn build:dev --config-name application`

##### Output

Application files are deployed into _/build_ folder.

## Local proxy configuration

####Envs:

- PROXY_TARGET_DOMAIN - target domain for proxy eg. `https://app-dev.goacoustic.com`; default: `https://app-dev.goacoustic.com`

####Authentication:

Default authentication provider in case of this application is OKTA. User is going to be redirected to login gate, unless credentials are already set in browser.
To avoid this, you need to visit `http://localhost:4200/auth/login`. This will let environment set all necessary authentication data.

## Release strategy

Package release workflow is automated by usage of `semantic-release`. It determines next version number, generates release notes and changelog file, and publishes the package to the right channel (`beta` or `latest`).

### `beta` channel - `develop` branch

#### Triggering a release

For each new commit added to `develop` branch, a CI build is triggered and runs the semantic-release command to make a release, if there are codebase changes since the last release. New version is published to `beta` channel.

#### Installing `beta` version

```bash
$ npm install @cui/shell-ui@beta
```

or

```bash
$ yarn add @cui/shell-ui@beta
```

### `latest` channel - `master` branch

#### Triggering a release

In order to release production version of the package, `develop` branch should be merged into `master`. New version (which is equal to latest version available on `beta` channel) is published to `latest` channel. **There is no need to merge `master` back to `develop`.**

#### Installing `latest` version

```bash
$ npm install @cui/shell-ui
or
$ yarn add @cui/shell-ui
```

### Sample development-release workflow

```
$ git log
* feat: intital feature on master # => v1.0.0 on @latest (master branch)
| \
|  * feat: new feature # => v1.1.0 on @beta (develop branch)
|  * feat: a big feature \n\n BREAKING CHANGE: it breaks something # => v2.0.0 on @beta
|  * fix: some fix # => v2.0.1 on @beta
| /|
*  | Merge branch develop into master # => v2.0.1 on @latest (merging develop into master means publishing to @latest)
|  * feat: one more feature # => v2.1.0 on @beta (we continue development on develop branch)
...
```

## Using as module

There are a few important thing you should keep in mind when using that as a module.

1. If you have shared package from node_module in your modules that package should be mentioned as `peerDependencies`
   and as `devDependencies` inside of your module. But that package should be included in `dependencies` for your parent repo.
2. You should import only **ADDITIONAL** styles. It means when your bundle your modules you should include only additional
   styles. And include main import like shell and decibel only inside you parent repo.

## Synchronize with this template repo

On your repo run

```
git remote add template git@github.com:aipoweredmarketer/cui-react-application.git
git fetch --all
git merge template/develop --allow-unrelated-histories
```

Resolve all conflicts, delete demo files

```
git merge --continue
git reset --soft HEAD~1
```

Perform a commit with changes as usual

## Learn More

- Check how to use seed application [here](https://github.com/aipoweredmarketer/cui-module-init/wiki).
- Check how to configure new repositories [here](https://confluence.acoustic.co/x/hZehAw).
- Check how to setup access to private packages [here](https://confluence.acoustic.co/x/74GzAw).
