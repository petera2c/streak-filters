import Input from "../Input";

const FilterValueInput = ({
  createFilter,
  onChange,
  value,
}: {
  createFilter: () => void;
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <Input
      autoFocus
      onChange={(e) => onChange(e.target.value)}
      onEnter={createFilter}
      value={value}
    />
  );
};

export default FilterValueInput;
