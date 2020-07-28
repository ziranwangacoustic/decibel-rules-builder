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

const COMMENT_START = {
  JS: '/* **************************************************************',
  SCSS: '/****************************************************************',
  HTML: '<!-- ************************************************************',
};
COMMENT_START.JSX = COMMENT_START.JS;
COMMENT_START.CSS = COMMENT_START.SCSS;

const COMMENT_END = {
  JS: ' *************************************************************** */',
  SCSS: ' *****************************************************************/',
  HTML: ' ************************************************************** -->',
};
COMMENT_END.JSX = COMMENT_END.JS;
COMMENT_END.CSS = COMMENT_END.SCSS;

const MIDDLE_HEADER = 'Copyright (C) 2020 Acoustic, L.P. All rights reserved.';
const COMMENT_MIDDLE = ` *
 * ${MIDDLE_HEADER}
 *
 * NOTICE: This file contains material that is confidential and proprietary to
 * Acoustic, L.P. and/or other developers. No license is granted under any intellectual or
 * industrial property rights of Acoustic, L.P. except as may be provided in an agreement with
 * Acoustic, L.P. Any unauthorized copying or distribution of content from this file is
 * prohibited.
 *`;

const getHeader = file => {
  const fileExt = file.split('.').pop();
  const EXTENSION = fileExt.toUpperCase();
  return `${COMMENT_START[EXTENSION]}\n${COMMENT_MIDDLE}\n${COMMENT_END[EXTENSION]}\n\n`;
};

const addHeaderToFileData = (file, data) => {
  const header = getHeader(file);
  return `${header}${data}`;
};

module.exports = {
  COMMENT_START,
  COMMENT_END,
  COMMENT_MIDDLE,
  MIDDLE_HEADER,
  getHeader,
  addHeaderToFileData,
};
