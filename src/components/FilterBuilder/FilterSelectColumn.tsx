import { DEMO_COLUMNS } from "../../consts/DemoData";
import TableColumn from "../../types/TableColumn";
import Select from "../Select/Select";

const FilterSelectColumn = ({
  onChange,
  open,
  selectedColumn,
  setOpen,
}: {
  onChange: (selectedColumn: TableColumn) => void;
  open: boolean;
  selectedColumn?: TableColumn;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Select
      onChange={onChange}
      open={open}
      options={DEMO_COLUMNS}
      setOpen={setOpen}
      showSearch
      value={selectedColumn}
    />
  );
};

export default FilterSelectColumn;
