#!/usr/bin/env node
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
/* eslint-disable no-console */

const fs = require('fs');
const { promisify } = require('util');
const glob = require('glob');
const chalk = require('chalk');
const { addHeaderToFileData, MIDDLE_HEADER } = require('../config/copyright');

const readFile = promisify(fs.readFile);

const FILE_EXT = ['js', 'jsx', 'scss', 'html'];

glob(`${process.cwd()}/src/**/*.{${FILE_EXT.join(',')}}`, (err, files) => {
  if (err) throw new Error(err);

  console.log(chalk.green('Adding Copyright comment to files'));

  const finished = [];
  const errors = [];
  const skipped = [];

  const checkProcess = () => {
    process.stdout.write('\rRunning...');

    if (finished.length + errors.length + skipped.length === files.length) {
      console.log(chalk.green(`\nCopyright process ended with:`));
      console.log(`${finished.length} files modified`);
      console.log(`${skipped.length} files skipped`);
      console.log(`${errors.length} errors`);

      if (errors.length) {
        console.log(chalk.red('These files could not be updated: '));
        errors.forEach(file => {
          console.log(file);
        });
      }
    }
  };

  const handleFileArray = array => file => {
    array.push(file);
    checkProcess();
  };

  const addFinish = handleFileArray(finished);
  const addError = handleFileArray(errors);
  const addSkipped = handleFileArray(skipped);

  files.forEach(file => {
    readFile(file).then(data => {
      if (data.indexOf(MIDDLE_HEADER) !== -1) {
        addSkipped(file);
        return;
      }
      const newData = addHeaderToFileData(file, data);
      const writeStream = fs.createWriteStream(file, { flags: 'w' });
      writeStream.on('finish', () => addFinish(file));
      writeStream.on('error', () => addError(file));
      writeStream.write(newData, 'utf8');
      writeStream.end();
    });
  });
});
