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

import React from 'react';
import { Button } from '@decibel/components';
import { RulesBuilderStory } from './RulesBuilderStory';
import { RulesBuilderNew } from './RulesBuilderNew';

const MyRulesBuilder = () => {
  return (
    <div>
      <Button
        className="some-class"
        href="#"
        iconDescription="Button icon"
        kind="primary"
        onClick={}
        onFocus={function noRefCheck() {}}
        onMouseDown={function noRefCheck() {}}
        preventDefaultOnMouseDown={false}
        renderIcon={undefined}
        showTooltip
        size="default"
      >
        Rule Composer Updated
      </Button>
      <RulesBuilderStory />
      {/* <RulesBuilderNew /> */}
    </div>
  );
};

export default MyRulesBuilder;
