type TableColumn = {
  label: string;
  type: "STRING" | "NUMBER" | "RELATION" | "ENUM" | "BOOLEAN" | "DATE";
  value: string;
  relations?: { label: string; value: string }[];
};

export default TableColumn;
