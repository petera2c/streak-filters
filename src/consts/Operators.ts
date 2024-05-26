const EQUAL_TO = { label: "Equal to", value: "equal_to" };
const NOT_EQUAL_TO = { label: "Not equal to", value: "not_equal_to" };
const CONTAINS = { label: "Contains", value: "contains" };
const DOES_NOT_CONTAIN = {
  label: "Does not contain",
  value: "does_not_contain",
};
const STARTS_WITH = { label: "Starts with", value: "starts_with" };
const ENDS_WITH = { label: "Ends with", value: "ends_with" };
const GREATER_THAN = { label: ">", value: ">" };
const LESS_THAN = { label: "<", value: "<" };
const GREATER_THAN_OR_EQUAL_TO = {
  label: ">=",
  value: ">=",
};
const LESS_THAN_OR_EQUAL_TO = {
  label: "<=",
  value: "<=",
};
const BEFORE = { label: "Before", value: "before" };
const AFTER = { label: "After", value: "after" };
const BETWEEN = { label: "Between", value: "between" };
const NOT_BETWEEN = { label: "Not between", value: "not_between" };
const IS_TRUE = { label: "is", value: true };
const IS_FALSE = { label: "is", value: false };

export const STRING_OPERATORS = [
  EQUAL_TO,
  NOT_EQUAL_TO,
  CONTAINS,
  DOES_NOT_CONTAIN,
  STARTS_WITH,
  ENDS_WITH,
];

export const NUMERIC_OPERATORS = [
  EQUAL_TO,
  NOT_EQUAL_TO,
  GREATER_THAN,
  LESS_THAN,
  GREATER_THAN_OR_EQUAL_TO,
  LESS_THAN_OR_EQUAL_TO,
];

export const DATE_OPERATORS = [
  EQUAL_TO,
  NOT_EQUAL_TO,
  BEFORE,
  AFTER,
  BETWEEN,
  NOT_BETWEEN,
];

export const BOOLEAN_OPERATORS = [IS_TRUE, IS_FALSE];

export const ENUM_OPERATORS = [EQUAL_TO, NOT_EQUAL_TO];

export const LIST_OPERATORS = [CONTAINS, DOES_NOT_CONTAIN];
