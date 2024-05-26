type TableFilterValue =
  | {
      label: string;
      value: string;
    }
  | {
      label: string;
      value: boolean;
    }
  | {
      label: string;
      value: string;
    }[];

export default TableFilterValue;
