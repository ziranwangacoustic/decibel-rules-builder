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

/* eslint-disable no-unused-vars */
import { TestScheduler } from 'rxjs/testing';
import { pingPongEpic, pongRequestEpic, EXAMPLE_URL } from './epics';

import { actions } from './reducers';

const assertDeepEquals = (actual, expected) => {
  expect(actual).toEqual(expected);
};

describe('Epics', () => {
  test('ping pong', () => {
    const testScheduler = new TestScheduler(assertDeepEquals);

    testScheduler.run(({ cold, hot, expectObservable, expectSubscriptions, flush }) => {
      const action$ = hot('a', {
        a: { type: actions.ping.type },
      });

      expectObservable(pingPongEpic(action$)).toBe('1s b', {
        b: {
          type: actions.pong.type,
        },
      });
    });
  });

  test('request on pong', () => {
    const testScheduler = new TestScheduler(assertDeepEquals);

    testScheduler.run(({ cold, hot, expectObservable, expectSubscriptions, flush }) => {
      const action$ = hot('a', {
        a: { type: actions.pong.type },
      });

      expectObservable(pongRequestEpic(action$)).toBe('b', {
        b: {
          type: 'REQUEST',
          meta: {
            url: EXAMPLE_URL,
          },
        },
      });
    });
  });
});
