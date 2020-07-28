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
import React from 'react';
import reducer, { actions, initialState } from './reducers';

describe('Reducer', () => {
  test('PING state', () => {
    expect(reducer.pingReducer(undefined, { type: actions.ping.type })).toEqual({
      ...initialState(),
      isPinging: true,
    });
  });
  test('PONG state', () => {
    expect(reducer.pingReducer(undefined, { type: actions.pong.type })).toEqual({
      ...initialState(),
      isPinging: false,
    });
  });
  test('SUCCESS state', () => {
    const payload = { data: 'VALUE' };
    expect(
      reducer.pingReducer(undefined, {
        type: actions.successRequest.type,
        payload,
      }),
    ).toEqual({
      ...initialState(),
      data: payload,
    });
  });
});
