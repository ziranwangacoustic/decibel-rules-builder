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

import { RulesBuilder, RulesFactory, Rule } from '@decibel/components';

const typesConfig = {
  STANDARD_NUMBER_RULE: {
    type: 'number',
  },
  STANDARD_NUMBER_RULE_WITH_VALIDATION: {
    type: 'number',
    placeholder: 'Custom Number Placeholder',
    validation: {
      required: true,
      min: 18,
      max: 100,
      maxTags: 2,
    },
  },
  STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS: {
    type: 'number',
    operators: ['EQUAL', 'BETWEEN'],
  },
  STANDARD_STRING_RULE: {
    type: 'string',
  },
  STANDARD_STRING_RULE_WITH_VALIDATION: {
    type: 'string',
    placeholder: 'Custom String Placeholder',
    validation: {
      restricted: 'abc',
      allowed: 'qwertyuiop',
      min: 5,
      max: 10,
      maxTags: 3,
      required: true,
    },
  },
  STANDARD_STRING_RULE_RESTRICTED_OPERATORS: {
    type: 'string',
    operators: ['IS', 'CONTAINS'],
  },
  CONTACTS: {
    type: 'number',
  },
  EMAIL: {
    type: 'string',
  },
  CUSTOM_RULE: {
    type: 'custom_rule',
  },
};

const dropdownConfig = [
  {
    key: 'CONTACTS',
    label: 'Contacts',
  },
  {
    key: 'EMAIL',
    label: 'Email',
  },
  {
    key: 'STANDARD_NUMBER_RULE',
    label: 'Standard number rule',
  },
  {
    key: 'STANDARD_NUMBER_RULE_WITH_VALIDATION',
    label: 'Standard number rule with validation',
  },
  {
    key: 'STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS',
    label: 'Standard number rule restricted operators',
  },
  {
    key: 'STANDARD_STRING_RULE',
    label: 'Standard string rule',
  },
  {
    key: 'STANDARD_STRING_RULE_WITH_VALIDATION',
    label: 'Standard string rule with validation',
  },
  {
    key: 'STANDARD_STRING_RULE_RESTRICTED_OPERATORS',
    label: 'Standard string rule restricted operators',
  },
  {
    key: 'CUSTOM_RULE',
    label: 'Custom rule',
  },
];

const factory = new RulesFactory(typesConfig, dropdownConfig);

// How to add custom rule
class CustomRule extends Rule {
  render() {
    return <div>Custom rule</div>;
  }

  // eslint-disable-next-line class-methods-use-this
  output() {
    return 'Custom rule data';
  }
}

factory.register('custom_rule', CustomRule);

const INITIAL_RULES = [
  {
    key: 'EMAIL',
    // operator: 'AND',
    data: {
      operator: 'IS',
      value: 'xxx@acoustic.co',
    },
  },
  {
    key: 'CONTACTS',
    // operator: 'OR',
    data: {
      operator: 'BETWEEN',
      value: [0, 1000],
    },
  },
  {
    operator: 'AND',
    data: [
      {
        key: 'STANDARD_STRING_RULE_WITH_VALIDATION',
        operator: 'OR',
        data: {
          operator: 'IS',
          value: 'John',
        },
      },
      {
        key: 'STANDARD_NUMBER_RULE_WITH_VALIDATION',
        operator: 'AND',
        data: {
          operator: 'EQUAL',
          value: null,
        },
      },
    ],
  },
];

export const RulesBuilderStory = () => {
  const rulesBuilder = new RulesBuilder({
    initialRules: INITIAL_RULES,
    rulesFactory: factory,
  });

  const downloadJson = e => {
    const { target } = e;
    const output = rulesBuilder.output();
    const data = `text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(output))}`;

    target.setAttribute('href', `data:${data}`);
    target.setAttribute('download', 'rules.json');
  };

  return (
    <>
      <div style={{ background: '#fff', padding: '20px' }}>{rulesBuilder.render()}</div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid,jsx-a11y/no-static-element-interactions */}
      <a
        onClick={downloadJson}
        style={{
          display: 'block',
          margin: '20px 0',
          padding: '10px',
          backgroundColor: '#13173d',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        Download JSON
      </a>
    </>
  );
};
