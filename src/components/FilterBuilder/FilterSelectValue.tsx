import { BOOLEAN_VALUES } from "../../consts/FilterValues";
import TableColumn from "../../types/TableColumn";
import TableFilterValue from "../../types/TableFilterValue";
import Select from "../Select/Select";
import FilterValueNumber from "./FilterValueNumber";
import FilterValueInput from "./FilterValueString";

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
            dropdownRender={
              <div className="flex flex-col gap-1">
                <div className="bg-white border border-slate-300 border-solid rounded shadow-md overflow-auto">
                  {selectedColumn.type === "STRING" && (
                    <FilterValueInput
                      createFilter={createFilter}
                      onChange={(value) =>
                        setSelectedValue({ label: value, value })
                      }
                      value={(selectedValue?.value || "") as string}
                    />
                  )}
                  {selectedColumn.type === "NUMBER" && (
                    <FilterValueNumber
                      createFilter={createFilter}
                      onChange={(value) =>
                        setSelectedValue({ label: String(value), value })
                      }
                      value={(selectedValue?.value || "") as string}
                    />
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  (Press enter to apply filter)
                </div>
              </div>
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
