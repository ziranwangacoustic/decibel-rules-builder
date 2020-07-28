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

import { createTranslationHook } from '@cui/shell-ui';

import enTranslation from './resources/translation/en.json';
import frTranslation from './resources/translation/fr.json';

// always use `createTranslationHook` to create i18n instance for your module/application
// it is hooked to user's settings, so you don't have to handle language change on your own
const { i18n, useTranslation } = createTranslationHook();

// configure your i18n instance accordingly to your needs
// for all options read: https://www.i18next.com/overview/configuration-options
// no need to use `react-i18next` plugin, it's already handled, just use `useTranslation` from this file
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  // add your translations here or if you need, you can load resources from backend,
  // ie. by using https://github.com/i18next/i18next-http-backend plugin
  resources: {
    en: {
      translation: enTranslation,
    },
    fr: {
      translation: frTranslation,
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default useTranslation;
