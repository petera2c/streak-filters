import TableFilterValue from "../../types/TableFilterValue";
import Input from "../Input";

const FilterValueInput = ({
  value,
  onChange,
}: {
  value: TableFilterValue;
  onChange: (value: TableFilterValue) => void;
}) => {
  if (typeof value === "boolean") {
    return <div>{value ? "True" : "False"}</div>;
  } else if (Array.isArray(value)) {
    return <div>{value.join(", ")}</div>;
  }
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-white border border-slate-300 border-solid rounded shadow-md overflow-auto">
        <Input
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>
      <div className="text-xs text-slate-400">(Press enter to apply)</div>
    </div>
  );
};

export default FilterValueInput;
