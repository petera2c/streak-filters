const IS = { label: "is", value: "is" };
const IS_NOT = { label: "is not", value: "is_not" };
const CONTAINS = { label: "Contains", value: "contains" };
const DOES_NOT_CONTAIN = {
  label: "Does not contain",
  value: "does_not_contain",
};
const STARTS_WITH = { label: "Starts with", value: "starts_with" };
const ENDS_WITH = { label: "Ends with", value: "ends_with" };
const EQUAL_TO = { label: "=", value: "=" };
const NOT_EQUAL_TO = { label: "≠", value: "!=" };
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

export const STRING_OPERATORS = [
  IS,
  IS_NOT,
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

export const DATE_OPERATORS = [IS, IS_NOT, BEFORE, AFTER, BETWEEN, NOT_BETWEEN];

export const BOOLEAN_OPERATORS = [IS];

export const ENUM_OPERATORS = [CONTAINS, DOES_NOT_CONTAIN];

export const RELATION_OPERATORS = [CONTAINS, DOES_NOT_CONTAIN];
