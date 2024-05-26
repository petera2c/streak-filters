import TableColumn from "../../types/TableColumn";
import {
  NUMERIC_OPERATORS,
  STRING_OPERATORS,
  BOOLEAN_OPERATORS,
  ENUM_OPERATORS,
  DATE_OPERATORS,
} from "../../consts/Operators";

export const getOperators = (column: TableColumn) => {
  switch (column.type) {
    case "STRING":
      return STRING_OPERATORS;
    case "RELATION":
      return STRING_OPERATORS;
    case "NUMBER":
      return NUMERIC_OPERATORS;
    case "DATE":
      return DATE_OPERATORS;
    case "BOOLEAN":
      return BOOLEAN_OPERATORS;
    case "ENUM":
      return ENUM_OPERATORS;
    default:
      return [];
  }
};
