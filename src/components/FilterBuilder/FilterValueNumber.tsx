import Input from "../Input";

const FilterValueNumber = ({
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
      onChange={(e) => {
        if (!isNaN(Number(e.target.value))) {
          onChange(e.target.value);
        }
      }}
      onEnter={createFilter}
      type="number"
      value={value}
    />
  );
};

export default FilterValueNumber;
