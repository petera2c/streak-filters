import TableFilterValue from "../../types/TableFilterValue";
import Input from "../Input";

const FilterValueInput = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Input autoFocus onChange={(e) => onChange(e.target.value)} value={value} />
  );
};

export default FilterValueInput;
