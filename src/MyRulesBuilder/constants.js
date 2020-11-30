export const CONJUNCTION_OR = {
  id: 'OR',
  label: 'Or',
};

export const CONJUNCTION_AND = {
  id: 'AND',
  label: 'And',
};

export const CONJUNCTION_AND_ALL = {
  id: 'AND_ALL',
  value: 'AND',
  label: 'And (changes all in level)',
  changeAll: true,
};

export const CONJUNCTION_AND_BRACKETS = {
  id: 'AND_BRACKETS',
  value: 'AND',
  label: 'And (adds bracket)',
  changeAll: false,
};

export const CONJUNCTION_OR_ALL = {
  id: 'OR_ALL',
  value: 'OR',
  label: 'Or (changes all in level)',
  changeAll: true,
};

export const CONJUNCTION_OR_BRACKETS = {
  id: 'OR_BRACKETS',
  value: 'OR',
  label: 'Or (adds bracket)',
  changeAll: false,
};

export const DEFAULT_TYPES = {
  number: 'number',
  string: 'string',
};

/**
 * Type of items that will be DnD
 */
export const DRAG_AND_DROP_ITEM_TYPES = {
  Rule: 'Rule',
};
