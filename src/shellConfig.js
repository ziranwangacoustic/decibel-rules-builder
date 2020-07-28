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

import {
  demoFeatures as addAppSpecificStaticFeaturesInstead,
  DemoHeaderGlobalBarContent,
  demoNotAllowedPath,
} from '@cui/shell-ui/build/demoUtils';
import { CURRENT_ENVIRONMENT_SETUP } from '@cui/shell-ui';
import { createBrowserHistory } from 'history';
import loggerCfg from './loggerConfig';

const PUBLIC_PATH = process.env.PUBLIC_PATH || '';
const BASE_NAME = PUBLIC_PATH ? `/${PUBLIC_PATH}` : '';

const security = {
  issuer: process.env.OKTA_AUTHORIZATION_SERVER || CURRENT_ENVIRONMENT_SETUP.security.issuer,
  clientId: process.env.OKTA_CLIENT_ID || CURRENT_ENVIRONMENT_SETUP.security.clientId,
};

const customerApiCfg = {
  baseUrl: process.env.CUSTOMER_API_URL || CURRENT_ENVIRONMENT_SETUP.customerApiCfg.baseUrl,
};

const appCfg = {
  applicationId: 'example-app-id',
  productName: 'Application Example',
};

const navigation = {
  features: addAppSpecificStaticFeaturesInstead,
  headerGlobalBarContent: DemoHeaderGlobalBarContent,
};

const walkme = {
  path: process.env.WALKME_PATH,
};

const routerCfg = { basename: BASE_NAME };

const routerHistory = createBrowserHistory(routerCfg);

const notAllowedRoutes = [{ path: demoNotAllowedPath }];

export default {
  customerApiCfg,
  appCfg,
  navigation,
  security,
  walkme,
  routerCfg,
  routerHistory,
  loggerCfg,
  notAllowedRoutes,
};
