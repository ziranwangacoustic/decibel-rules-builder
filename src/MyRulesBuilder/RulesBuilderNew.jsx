import React, { useCallback, useState } from 'react';

import { RulesBuilder, RulesFactory, Rule } from '@decibel/components';
import { CONJUNCTION_AND, CONJUNCTION_OR } from './constants';

const attributesConfig = {
  STANDARD_NUMBER_RULE: {
    label: 'Standard number rule',
    type: 'number',
    validation: values => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ numberRule1: `${values.numberRule1} - custom Error` });
        }, 3000);
      });
    },
  },
  STANDARD_NUMBER_RULE_WITH_VALIDATION: {
    label: 'Standard number rule with validation',
    type: 'number',
    placeholder: 'Custom Number Placeholder',
    validation: {
      required: true,
      min: 18,
      max: 100,
      maxTags: 3,
    },
  },
  STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS: {
    label: 'Standard number rule restricted operators',
    type: 'number',
    operators: ['EQUAL', 'BETWEEN'],
  },
  STANDARD_STRING_RULE: {
    label: 'Standard string rule',
    type: 'string',
    validation: {
      maxTags: 6,
    },
  },
  STANDARD_STRING_RULE_WITH_VALIDATION: {
    label: 'Standard string rule with validation',
    type: 'string',
    placeholder: 'Enter value',
    validation: {
      restricted: 'abcd',
      allowed: 'qwe',
      min: 5,
      max: 10,
      maxTags: 20,
      required: true,
    },
  },
  STANDARD_STRING_RULE_RESTRICTED_OPERATORS: {
    label: 'Standard string rule restricted operators',
    type: 'string',
    operators: ['IS', 'CONTAINS'],
  },
  AGE: {
    label: 'Age',
    type: 'number',
  },
  NAME: {
    label: 'Name',
    type: 'string',
  },
  CUSTOM_RULE: {
    label: 'Custom rule',
    type: 'custom_rule',
  },
  CUSTOM_RULE_2: {
    label: 'Custom rule 2',
    type: 'custom_rule',
  },
};

const attributeDropdown = [
  'AGE',
  'NAME',
  'STANDARD_NUMBER_RULE',
  'STANDARD_NUMBER_RULE_WITH_VALIDATION',
  'STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS',
  'STANDARD_STRING_RULE',
  'STANDARD_STRING_RULE_WITH_VALIDATION',
  'STANDARD_STRING_RULE_RESTRICTED_OPERATORS',
  'CUSTOM_RULE',
  'CUSTOM_RULE_2',
];

const criteriaDropdown = [
  {
    id: 'option-1-1',
    text: 'All',
    attr: [
      'AGE',
      'NAME',
      'STANDARD_NUMBER_RULE',
      'STANDARD_NUMBER_RULE_WITH_VALIDATION',
      'STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS',
      'STANDARD_STRING_RULE',
      'STANDARD_STRING_RULE_WITH_VALIDATION',
      'STANDARD_STRING_RULE_RESTRICTED_OPERATORS',
      'CUSTOM_RULE',
      'CUSTOM_RULE_2',
    ],
  },
  {
    id: 'option-1-2',
    text: 'Option 1-2',
    sublist: [
      {
        id: 'option-2-1',
        text: 'Number rule',
        attr: [
          'STANDARD_NUMBER_RULE',
          'STANDARD_NUMBER_RULE_WITH_VALIDATION',
          'STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS',
        ],
      },
      {
        id: 'option-2-2',
        text: 'Option 2-2',
        sublist: [
          {
            id: 'option-3-1',
            text: 'Option 3-1',
            sublist: [
              {
                id: 'option-4-1',
                text: 'String rule',
                attr: [
                  'STANDARD_STRING_RULE',
                  'STANDARD_STRING_RULE_WITH_VALIDATION',
                  'STANDARD_STRING_RULE_RESTRICTED_OPERATORS',
                ],
              },
              {
                id: 'option-4-2',
                text: 'Custom rules',
                attr: ['CUSTOM_RULE'],
              },
            ],
          },
          {
            id: 'option-3-2',
            text: 'Option 3-2',
          },
        ],
      },
    ],
  },
  {
    id: 'option-1-3',
    text: 'Number rule',
    attr: [
      'STANDARD_NUMBER_RULE',
      'STANDARD_NUMBER_RULE_WITH_VALIDATION',
      'STANDARD_NUMBER_RULE_RESTRICTED_OPERATORS',
    ],
  },
  {
    id: 'option-1-4',
    text: 'Option 1-4',
    sublist: [
      {
        id: 'option-2-3',
        text: 'Custom rules',
        attr: ['CUSTOM_RULE'],
      },
    ],
  },
];

const factory = new RulesFactory({ attributesConfig, attributeDropdown, criteriaDropdown });

const CustomRuleElement = ({ CriteriaSelector, onChangeValue }) => {
  const [value, setValue] = useState(0);

  const handleClick = useCallback(
    () =>
      setValue(st => {
        onChangeValue(st + 1);
        return st + 1;
      }),
    [onChangeValue],
  );

  return (
    <>
      <div style={{ padding: '0 20px' }}>Start of custom rule</div>
      {CriteriaSelector}
      <button onClick={handleClick} type="button">
        Counter + 1
      </button>
      <div>Counter: {value}</div>
    </>
  );
};

// How to add custom rule
class CustomRule extends Rule {
  handleOperatorChange = value => {
    this.operator = value;
  };

  handleValueChange = value => {
    this.value = value;
  };

  render({ isReadOnly, CriteriaSelector }) {
    return (
      <CustomRuleElement
        CriteriaSelector={CriteriaSelector}
        isReadOnly={isReadOnly}
        onChangeOperator={this.handleOperatorChange}
        onChangeValue={this.handleValueChange}
      />
    );
  }

  // eslint-disable-next-line class-methods-use-this
  output() {
    const { operator, value } = this;
    return { operator, value, temp: 'test' };
  }
}

factory.register('custom_rule', CustomRule);

const INITIAL_RULES = [
  {
    keyCriteria: 'option-1-1',
    keyAttr: 'STANDARD_NUMBER_RULE_WITH_VALIDATION',
    operator: CONJUNCTION_AND.id,
    data: {
      operator: 'EQUAL',
      value: 25,
    },
  },
  {
    operator: CONJUNCTION_AND.id,
    data: [
      {
        keyCriteria: 'option-1-1',
        keyAttr: 'STANDARD_STRING_RULE_WITH_VALIDATION',
        operator: CONJUNCTION_OR.id,
        data: {
          operator: 'IS',
          value: 'John',
        },
      },
      {
        keyCriteria: 'option-1-1',
        keyAttr: 'AGE',
        operator: CONJUNCTION_OR.id,
        data: {
          operator: 'BETWEEN',
          value: [18, 100],
        },
      },
    ],
  },
  {
    keyCriteria: 'option-1-1',
    keyAttr: 'NAME',
    operator: CONJUNCTION_AND.id,
    data: {
      operator: 'IS',
      value: 'John',
    },
  },
];

export const RulesBuilderNew = ({
  isHideSelectCriteria,
  isSimpleDnD,
  isReadOnly,
  maxNumberOfLevels,
  maxNumberOfOperands,
  oneConjunctionMode,
}) => {
  const rulesBuilder = new RulesBuilder({
    initialRules: INITIAL_RULES,
    rulesFactory: factory,
    options: {
      isHideSelectCriteria,
      isSimpleDnD,
      isReadOnly,
      maxNumberOfLevels,
      maxNumberOfOperands,
      oneConjunctionMode,
    },
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
