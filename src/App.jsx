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

import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { LoadingBarTemplate } from '@decibel/components';
import {
  DemoApiProvider,
  DemoAuthProvider,
  DemoLoggerProvider,
  DemoProductProvider,
} from '@cui/shell-ui/build/demoUtils';
import store from './configureStore';
import RootComponent from './RootComponent';
import { name, version } from '../package.json';
import { LoggerProvider, exampleLoggerCfg } from './example-logger/ExampleLogger';

import MyRulesBuilder from './MyRulesBuilder/MyRulesBuilder';

const App = () => <MyRulesBuilder />;

export default App;

{
  /* <Provider store={store}>
<Suspense fallback={<LoadingBarTemplate show />}> */
}
{
  /* START: App specific providers */
}
// <LoggerProvider name={name} version={version} config={exampleLoggerCfg}>
//   <DemoLoggerProvider>
//     <DemoProductProvider>
//       <DemoApiProvider>
//         <DemoAuthProvider>
{
  /* END: App specific providers */
}
//             <RootComponent />
//           </DemoAuthProvider>
//         </DemoApiProvider>
//       </DemoProductProvider>
//     </DemoLoggerProvider>
//   </LoggerProvider>
// </Suspense>
// </Provider>
