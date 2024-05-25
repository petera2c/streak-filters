type TableFilter = {
  column: string;
  operator: string;
  value: string | string[] | number | number[] | boolean;
};

export default TableFilter;
