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

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import { stateManagementMiddleware, enabledStateManagementState } from '@cui/shell-ui';
import rootEpics from './rootEpics';
import rootReducers from './rootReducers';
import shellConfig from './shellConfig';

const epicMiddleware = createEpicMiddleware();

export default createStore(
  rootReducers,
  enabledStateManagementState,
  composeWithDevTools(
    applyMiddleware(
      stateManagementMiddleware,
      routerMiddleware(shellConfig.routerHistory),
      epicMiddleware,
    ),
  ),
);

epicMiddleware.run(rootEpics);
