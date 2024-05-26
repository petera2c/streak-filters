import TableFilterValue from "../../types/TableFilterValue";
import Select from "../Select";
import FilterValueInput from "./FilterValueInput";

const FilterSelectValue = ({
  onEnter,
  open,
  selectedValue,
  setOpen,
  setSelectedValue,
}: {
  onEnter: () => void;
  open: boolean;
  selectedValue: TableFilterValue;
  setOpen: (open: boolean) => void;
  setSelectedValue: (selectedValue: TableFilterValue) => void;
}) => {
  return (
    <Select
      dropdownRender={
        <FilterValueInput value={selectedValue} onChange={setSelectedValue} />
      }
      onEnter={onEnter}
      open={open}
      setOpen={setOpen}
      showSearch
    />
  );
};

export default FilterSelectValue;
