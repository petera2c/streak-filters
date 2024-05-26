import TableColumn from "../../types/TableColumn";
import TableFilterOperator from "../../types/TableFilterOperator";
import Select from "../Select";
import { getOperators } from "./FilterBuilderUtils";

const FilterSelectOperator = ({
  onChange,
  open,
  selectedColumn,
  selectedOperator,
  setOpen,
}: {
  onChange: (selectedOperator: TableFilterOperator) => void;
  open: boolean;
  selectedColumn: TableColumn;
  selectedOperator?: TableFilterOperator;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <Select
      onChange={onChange}
      open={open}
      options={getOperators(selectedColumn)}
      setOpen={setOpen}
      showSearch
      value={selectedOperator}
    />
  );
};

export default FilterSelectOperator;
