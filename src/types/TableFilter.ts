import TableColumn from "./TableColumn";
import TableFilterOperator from "./TableFilterOperator";
import TableFilterValue from "./TableFilterValue";

type TableFilter = {
  column: TableColumn;
  operator: TableFilterOperator;
  value: TableFilterValue;
};

export default TableFilter;
