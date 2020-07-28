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

import { createSlice } from '@reduxjs/toolkit';

/* eslint no-param-reassign: 0 */

export const initialState = () => ({
  isPinging: false,
});

const { reducer: pingReducer, actions } = createSlice({
  name: 'exampleReducer',
  initialState: initialState(),
  reducers: {
    ping: state => {
      state.isPinging = true;
    },
    pong: state => {
      state.isPinging = false;
    },
    successRequest: (state, action) => {
      state.data = action.payload;
    },
  },
});

export { actions };

export default { pingReducer };
