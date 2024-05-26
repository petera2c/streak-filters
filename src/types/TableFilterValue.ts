type TableFilterValue =
  | {
      label: string;
      value: string;
    }
  | {
      label: string;
      value: number;
    }
  | {
      label: string;
      value: boolean;
    }
  | {
      label: string;
      value: string;
    }[]
  | {
      label: string;
      value: number;
    }[];

export default TableFilterValue;
