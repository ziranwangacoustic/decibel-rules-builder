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
import axios from 'axios';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { fireEvent, render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { LoggerProvider } from '../example-logger/ExampleLogger';
import ExampleComponent from './ExampleComponent';
import reducer, { actions } from './reducers';

const middlewares = [createEpicMiddleware()];
const mockStore = configureMockStore(middlewares);

jest.mock('axios');

const createWrapper = storeInstance => ({ children }) => (
  <Suspense fallback="loading">
    <Provider store={storeInstance}>
      <MemoryRouter>
        <LoggerProvider>{children}</LoggerProvider>
      </MemoryRouter>
    </Provider>
  </Suspense>
);

describe('ExampleComponent', () => {
  let storeInstance;
  beforeEach(() => {
    storeInstance = mockStore(reducer);
  });

  test('should match snapshots', async () => {
    const { container, findByText } = render(<ExampleComponent />, {
      wrapper: createWrapper(storeInstance),
    });
    await findByText('Start PING');
    expect(container.firstChild).toMatchSnapshot();
  });

  test('ping pong integration', async () => {
    const { getByText, findByText } = render(<ExampleComponent />, {
      wrapper: createWrapper(storeInstance),
    });

    const pingButton = await findByText('Start PING');
    expect(getByText('is pinging: false')).toBeInTheDocument();

    fireEvent(
      pingButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    expect(storeInstance.getActions()).toMatchObject([
      expect.anything(),
      { type: actions.ping.type, payload: undefined },
    ]);
  });
});
