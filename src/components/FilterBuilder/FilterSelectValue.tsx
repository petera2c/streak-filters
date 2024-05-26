import { BOOLEAN_VALUES } from "../../consts/FilterValues";
import TableColumn from "../../types/TableColumn";
import TableFilterValue from "../../types/TableFilterValue";
import Select from "../Select/Select";
import FilterValueNumberInput from "./FilterValueNumberInput";
import FilterValueStringInput from "./FilterValueStringInput";

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
  switch (selectedColumn.type) {
    case "RELATION":
    case "ENUM":
      return (
        <Select
          mode="multiple"
          onChange={setSelectedValue}
          onEnter={() => setCompleteFilter(true)}
          open={open}
          options={selectedColumn.relations}
          setOpen={setOpen}
          showSearch
          value={selectedValue}
        />
      );
    case "STRING":
    case "NUMBER":
      if (!Array.isArray(selectedValue))
        return (
          <Select
            descriptionText="(Press enter to apply filter)"
            dropdownRender={
              <>
                {selectedColumn.type === "STRING" && (
                  <FilterValueStringInput
                    createFilter={createFilter}
                    onChange={(value) =>
                      setSelectedValue({ label: value, value })
                    }
                    value={(selectedValue?.value || "") as string}
                  />
                )}
                {selectedColumn.type === "NUMBER" && (
                  <FilterValueNumberInput
                    createFilter={createFilter}
                    onChange={(value) =>
                      setSelectedValue({ label: String(value), value })
                    }
                    value={(selectedValue?.value || "") as string}
                  />
                )}
              </>
            }
            open={open}
            setOpen={setOpen}
          />
        );
      else return <></>;
    case "BOOLEAN":
      return (
        <Select
          onChange={setSelectedValue}
          onEnter={() => setCompleteFilter(true)}
          open={open}
          options={BOOLEAN_VALUES}
          setOpen={setOpen}
        />
      );

    default:
      return <>{selectedColumn.type}</>;
  }
};

export default FilterSelectValue;
