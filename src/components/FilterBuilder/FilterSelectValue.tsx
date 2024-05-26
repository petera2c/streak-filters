import { BOOLEAN_VALUES } from "../../consts/FilterValues";
import { BOOLEAN_OPERATORS } from "../../consts/Operators";
import TableColumn from "../../types/TableColumn";
import TableFilterValue from "../../types/TableFilterValue";
import Select from "../Select";
import FilterValueNumber from "./FilterValueNumber";
import FilterValueInput from "./FilterValueString";

const FilterSelectValue = ({
  onEnter,
  open,
  selectedColumn,
  selectedValue,
  setOpen,
  setSelectedValue,
}: {
  onEnter: () => void;
  open: boolean;
  selectedColumn: TableColumn;
  selectedValue?: TableFilterValue;
  setOpen: (open: boolean) => void;
  setSelectedValue: (selectedValue: TableFilterValue) => void;
}) => {
  switch (selectedColumn.type) {
    case "RELATION":
    case "ENUM":
      return (
        <Select
          mode="multiple"
          onEnter={onEnter}
          open={open}
          options={selectedColumn.relations}
          setOpen={setOpen}
          showSearch
        />
      );
    case "STRING":
    case "NUMBER":
      return (
        <Select
          dropdownRender={
            <div className="flex flex-col gap-1">
              <div className="bg-white border border-slate-300 border-solid rounded shadow-md overflow-auto">
                {selectedColumn.type === "STRING" && (
                  <FilterValueInput
                    onChange={(value) =>
                      setSelectedValue({ label: value, value })
                    }
                    value={(selectedValue?.value || "") as string}
                  />
                )}
                {selectedColumn.type === "NUMBER" && (
                  <FilterValueNumber
                    onChange={(value) =>
                      setSelectedValue({ label: String(value), value })
                    }
                    value={selectedValue?.value as number}
                  />
                )}
              </div>
              <div className="text-xs text-slate-400">
                (Press enter to apply filter)
              </div>
            </div>
          }
          onEnter={onEnter}
          open={open}
          setOpen={setOpen}
        />
      );
    case "BOOLEAN":
      return (
        <Select
          onChange={(value) => {
            setSelectedValue(value);
            // onEnter();
          }}
          open={open}
          options={BOOLEAN_VALUES}
          setOpen={setOpen}
          onEnter={onEnter}
        />
      );

    default:
      return <>{selectedColumn.type}</>;
  }
};

export default FilterSelectValue;
