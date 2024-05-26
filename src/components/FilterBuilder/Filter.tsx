import { useEffect, useRef, useState } from "react";
import TableFilter from "../../types/TableFilter";
import TableColumn from "../../types/TableColumn";
import FilterChip from "./FilterChip";
import TableFilterOperator from "../../types/TableFilterOperator";
import TableFilterValue from "../../types/TableFilterValue";
import FilterSelectColumn from "./FilterSelectColumn";
import FilterSelectOperator from "./FilterSelectOperator";
import FilterSelectValue from "./FilterSelectValue";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";

const Filter = ({
  addFilter,
  editFilter,
  index,
  filter,
  removeFilter,
}: {
  addFilter?: (filter: TableFilter) => void;
  editFilter?: (index: number, filter: TableFilter) => void;
  index?: number;
  filter?: TableFilter;
  removeFilter?: (index: number) => void;
}) => {
  // Refs
  const filterRef = useRef<HTMLDivElement>(null);

  // Local state
  const [selectedColumn, setSelectedColumn] = useState<TableColumn>();
  const [selectedOperator, setSelectedOperator] =
    useState<TableFilterOperator>();
  const [selectedValue, setSelectedValue] = useState<TableFilterValue>("");
  const [open, setOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState<
    "column" | "operator" | "value"
  >("column");

  // Custom hooks
  useOnOutsideClick(filterRef, () => {
    setOpen(false);
  });

  // Derived state
  const canAddFilter =
    selectedColumn && selectedOperator && selectedValue && addFilter;
  const canEditFilter =
    selectedColumn &&
    selectedOperator &&
    selectedValue &&
    index !== undefined &&
    editFilter;

  // Handlers
  const reset = () => {
    setSelectedColumn(undefined);
    setSelectedOperator(undefined);
    setSelectedValue("");
  };
  const onEnter = () => {
    if (canEditFilter) {
      editFilter(index, {
        column: selectedColumn,
        operator: selectedOperator,
        value: selectedValue,
      });
    } else if (canAddFilter) {
      addFilter({
        column: selectedColumn,
        operator: selectedOperator,
        value: selectedValue,
      });
      reset();
    }
  };
  const onColumnChange = (value: TableColumn) => {
    setSelectedColumn(value);
    setCurrentlyEditing("operator");
  };
  const onOperatorChange = (value: TableFilterOperator) => {
    setSelectedOperator(value);
    setCurrentlyEditing("value");
  };

  // Initialize state from filter prop
  useEffect(() => {
    if (filter) {
      setSelectedColumn(filter.column);
      setSelectedOperator(filter.operator);
      setSelectedValue(filter.value);
    }
  }, [filter]);

  return (
    <div className="relative flex flex-col" ref={filterRef}>
      <FilterChip
        onClick={() => setOpen(true)}
        onDelete={() => index && removeFilter?.(index)}
        removable={index !== undefined && Boolean(removeFilter)}
        selectedColumn={selectedColumn}
        selectedOperator={selectedOperator}
        selectedValue={selectedValue}
      />
      {currentlyEditing === "column" && (
        <FilterSelectColumn
          onChange={onColumnChange}
          open={open}
          selectedColumn={selectedColumn}
          setOpen={setOpen}
        />
      )}
      {selectedColumn && currentlyEditing === "operator" && (
        <FilterSelectOperator
          onChange={onOperatorChange}
          open={open}
          selectedColumn={selectedColumn}
          selectedOperator={selectedOperator}
          setOpen={setOpen}
        />
      )}
      {selectedColumn && selectedOperator && currentlyEditing === "value" && (
        <FilterSelectValue
          onEnter={onEnter}
          open={open}
          selectedValue={selectedValue}
          setOpen={setOpen}
          setSelectedValue={setSelectedValue}
        />
      )}
    </div>
  );
};

export default Filter;
