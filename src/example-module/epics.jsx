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

import { delay, mapTo } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { actions } from './reducers';

export const EXAMPLE_URL = 'https://api.github.com/users/jayphelps';

export const pingPongEpic = action$ =>
  action$
    .pipe(ofType(actions.ping.type))
    .pipe(delay(1000))
    .pipe(
      mapTo({
        type: actions.pong.type,
      }),
    );

export const pongRequestEpic = action$ =>
  action$.pipe(ofType(actions.pong.type)).pipe(
    mapTo({
      type: 'REQUEST',
      meta: {
        url: EXAMPLE_URL,
      },
    }),
  );
