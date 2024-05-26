import TableFilterValue from "../../types/TableFilterValue";
import Input from "../Input";

const FilterValueNumber = ({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) => {
  return (
    <Input
      autoFocus
      onChange={(e) => onChange(Number(e.target.value))}
      type="number"
      value={value !== undefined ? value : ""}
    />
  );
};

export default FilterValueNumber;
