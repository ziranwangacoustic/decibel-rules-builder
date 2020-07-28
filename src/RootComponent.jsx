/* **************************************************************
 *
 * Copyright (C) 2020 Acoustic, L.P. All rights reserved.
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *
 *************************************************************** */

/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Route } from 'react-router-dom';
import Shell, { LoadingPage, NoAccess, NoSubscriptions } from '@cui/shell-ui';
import {
  demoApiPath,
  demoRequestErrorPath,
  demoTaggingPageTagPath,
  demoOutagePath,
  demoOutagePathWithDate,
  demoNoSubscriptionsPath,
  demoLoadingPath,
  demoNoAccessPath,
  DemoCfg,
  DemoContentPage,
  DemoPersonalizationPage,
  DemoSsoPage,
  DemoRequestError,
  DemoTaggingPageTag,
  DemoOutageRedirect,
  ssoRoutePath,
  useDemoApiCfg,
  useDemoAuth,
  useDemoProduct,
  useFeatures as useYourApplicationAsyncFeaturesInstead,
  useStaticProducts,
} from '@cui/shell-ui/build/demoUtils';
import { SecureRoute } from '@okta/okta-react';
import ExampleComponent from './example-module';
import staticShellConfig from './shellConfig';

const {
  navigation: staticNavigation,
  security: staticSecurity,
  appCfg: staticAppCfg,
} = staticShellConfig;

const RootComponent = () => {
  // START: App specific configuration
  const apiCfg = useDemoApiCfg();
  const demoSecurity = useDemoAuth();
  const { productId, onProductSelect } = useDemoProduct();
  const applicationAsyncFeatures = useYourApplicationAsyncFeaturesInstead();
  const features = useMemo(() => [...staticNavigation.features, ...applicationAsyncFeatures], [
    applicationAsyncFeatures,
  ]);
  const security = useMemo(() => ({ ...staticSecurity, ...demoSecurity }), [demoSecurity]);
  const appCfg = useMemo(() => ({ ...staticAppCfg, productId, onProductSelect }), [
    productId,
    onProductSelect,
  ]);
  useStaticProducts();

  // Digital Analytics
  const digitalAnalytics = {
    siteId: process.env.DA_SITE_ID,
  };
  // END: Digital Analytics
  // END: App specific configuration

  return (
    <Shell
      {...staticShellConfig}
      appCfg={appCfg}
      apiCfg={apiCfg}
      security={security}
      features={features}
      digitalAnalytics={digitalAnalytics}
    >
      {/* START: App routes */}
      <SecureRoute path="/" exact component={ExampleComponent} />
      <Route path={ssoRoutePath}>
        <DemoSsoPage />
      </Route>
      <Route path={demoApiPath}>
        <DemoCfg />
      </Route>
      <Route path={demoRequestErrorPath}>
        <DemoRequestError />
      </Route>
      <Route path={demoTaggingPageTagPath}>
        <DemoTaggingPageTag />
      </Route>
      <Route path={demoNoAccessPath}>
        <NoAccess />
      </Route>
      <Route path={demoOutagePath}>
        <DemoOutageRedirect />
      </Route>
      <Route path={demoNoSubscriptionsPath}>
        <NoSubscriptions />
      </Route>
      <Route path={demoOutagePathWithDate}>
        <DemoOutageRedirect />
      </Route>
      <Route path={demoLoadingPath}>
        <LoadingPage />
      </Route>
      <SecureRoute path="/content" component={DemoContentPage} />
      <SecureRoute path="/personalization" component={DemoPersonalizationPage} />
      {/* END: App routes */}
    </Shell>
  );
};

export default RootComponent;
