import { BOOLEAN_VALUES } from "../../consts/FilterValues";
import TableColumn from "../../types/TableColumn";
import TableFilterValue from "../../types/TableFilterValue";
import Select, { SelectWrapperProps } from "../Select/Select";
import FilterValueNumberInput from "./FilterValueNumberInput";
import FilterValueStringInput from "./FilterValueStringInput";

const componentMap = {
  STRING: FilterValueStringInput,
  NUMBER: FilterValueNumberInput,
};

const FilterSelectValue = ({
  createFilter,
  open,
  selectedColumn,
  selectedValue,
  setCompleteFilter,
  setOpen,
  setSelectedValue,
}: {
  createFilter: () => void;
  open: boolean;
  selectedColumn: TableColumn;
  selectedValue?: TableFilterValue;
  setCompleteFilter: (completeFilter: boolean) => void;
  setOpen: (open: boolean) => void;
  setSelectedValue: (selectedValue: TableFilterValue) => void;
}) => {
  let selectProps: SelectWrapperProps = {
    descriptionText: "(Press enter to apply filter)",
    onChange: setSelectedValue,
    onEnter: () => setCompleteFilter(true),
    open,
    setOpen,
    showSearch: true,
    value: selectedValue,
  };

  if (selectedColumn.type === "RELATION" || selectedColumn.type === "ENUM") {
    selectProps = {
      ...selectProps,
      mode: "multiple",
      options: selectedColumn.relations,
    };
  } else if (
    selectedColumn.type === "STRING" ||
    selectedColumn.type === "NUMBER"
  ) {
    const InputComponent = componentMap[selectedColumn.type];
    if (!Array.isArray(selectedValue) && InputComponent) {
      selectProps = {
        ...selectProps,
        dropdownRender: (
          <InputComponent
            createFilter={createFilter}
            onChange={(value) => setSelectedValue({ label: value, value })}
            value={(selectedValue?.value || "") as string}
          />
        ),
      };
    }
  } else if (selectedColumn.type === "BOOLEAN") {
    selectProps = {
      ...selectProps,
      options: BOOLEAN_VALUES,
      onChange: (value) => {
        setSelectedValue(value);
        setCompleteFilter(true);
      },
    };
  }

  return <Select {...selectProps} />;
};

export default FilterSelectValue;
