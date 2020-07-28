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

/* eslint-disable react/jsx-filename-extension */
import { createMemoryHistory } from 'history';
import { securityMockSetup } from '@cui/shell-ui/build/testUtils';
import {
  ApplicationCfgProvider,
  CustomerApiCfgProvider,
  SubscriptionsProvider,
  subscriptionsMockData,
} from '@cui/shell-ui';
import { Router } from 'react-router';
import { Security } from '@okta/okta-react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore();

export const subscriptionMock = subscriptionsMockData[0];
export const subscriptionId = subscriptionMock.id;
export const allSubscriptions = subscriptionsMockData;
export const subscriptionsState = {
  map: allSubscriptions.reduce(
    (asMap, subscription) => ({ ...asMap, [subscription.id]: subscription }),
    {},
  ),
  currentSubscriptionId: subscriptionId,
};

export const SecurityWrappers = ({
  children,
  history = createMemoryHistory(),
  security = securityMockSetup(),
}) => (
  <Router history={history}>
    <Security {...security}>{children}</Security>
  </Router>
);

export const WithSubscriptionsWrappers = ({
  children,
  history,
  security,
  baseUrl = '',
  apis,
  store = mockStore({ subscriptions: subscriptionsState }),
}) => (
  <Provider store={store}>
    <ApplicationCfgProvider>
      <CustomerApiCfgProvider baseUrl={baseUrl} apis={apis}>
        <SecurityWrappers history={history} security={security}>
          {children}
        </SecurityWrappers>
      </CustomerApiCfgProvider>
    </ApplicationCfgProvider>
  </Provider>
);
export const WithSubscriptions = ({ children, ...props }) => (
  <WithSubscriptionsWrappers {...props}>
    <SubscriptionsProvider>{children}</SubscriptionsProvider>
  </WithSubscriptionsWrappers>
);
