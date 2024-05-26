import { useCallback, useEffect, useRef, useState } from "react";
import TableFilter from "../../types/TableFilter";
import TableColumn from "../../types/TableColumn";
import FilterChip from "./FilterChip";
import TableFilterOperator from "../../types/TableFilterOperator";
import TableFilterValue from "../../types/TableFilterValue";
import FilterSelectColumn from "./FilterSelectColumn";
import FilterSelectOperator from "./FilterSelectOperator";
import FilterSelectValue from "./FilterSelectValue";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import { BOOLEAN_OPERATORS } from "../../consts/Operators";
import FilterEditingStage from "../../types/FilterEditingStage";

const Filter = ({
  addFilter,
  editFilter,
  highlightedIndex,
  index,
  filter,
  removeFilter,
}: {
  addFilter?: (filter: TableFilter) => void;
  editFilter?: (index: number, filter: TableFilter) => void;
  highlightedIndex?: number;
  index?: number;
  filter?: TableFilter;
  removeFilter?: (index: number) => void;
}) => {
  // Refs
  const filterRef = useRef<HTMLDivElement>(null);

  // Local state
  const [selectedColumn, setSelectedColumn] = useState<TableColumn | undefined>(
    filter?.column
  );
  const [selectedOperator, setSelectedOperator] = useState<
    TableFilterOperator | undefined
  >(filter?.operator);
  const [selectedValue, setSelectedValue] = useState<
    TableFilterValue | undefined
  >(filter?.value);
  const [open, setOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] =
    useState<FilterEditingStage>("column");
  const [completeFilter, setCompleteFilter] = useState<boolean>(false);

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
    setSelectedValue(undefined);
    setCurrentlyEditing("column");
    setCompleteFilter(false);
  };

  const createFilter = useCallback(() => {
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
    }
    reset();
    setOpen(false);
  }, [
    addFilter,
    canAddFilter,
    canEditFilter,
    editFilter,
    index,
    selectedColumn,
    selectedOperator,
    selectedValue,
  ]);

  const onColumnChange = (value: TableColumn) => {
    setSelectedColumn(value);
    if (value.type === "BOOLEAN") {
      setSelectedOperator(BOOLEAN_OPERATORS[0]);
      setCurrentlyEditing("value");
    } else {
      setCurrentlyEditing("operator");
    }
  };
  const onOperatorChange = (value: TableFilterOperator) => {
    setSelectedOperator(value);
    if (!selectedValue) {
      setCurrentlyEditing("value");
    } else {
      setOpen(false);
    }
  };

  // Initialize state from filter prop
  useEffect(() => {
    if (filter) {
      setSelectedColumn(filter.column);
      setSelectedOperator(filter.operator);
      setSelectedValue(filter.value);
    }
  }, [filter]);

  // Create filter when complete
  useEffect(() => {
    if (selectedColumn && selectedOperator && selectedValue && completeFilter) {
      createFilter();
    }
  }, [
    completeFilter,
    createFilter,
    filter,
    selectedColumn,
    selectedOperator,
    selectedValue,
  ]);

  useEffect(() => {
    if (!open && !filter) {
      reset();
    }
  }, [filter, open]);

  return (
    <div className="relative flex flex-col" ref={filterRef}>
      <FilterChip
        highlightedIndex={highlightedIndex}
        index={index}
        onClick={(editingStage: FilterEditingStage) => {
          setCurrentlyEditing(editingStage);
          setOpen(true);
        }}
        onDelete={() => index !== undefined && removeFilter?.(index)}
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
          createFilter={createFilter}
          open={open}
          selectedColumn={selectedColumn}
          selectedValue={selectedValue}
          setCompleteFilter={setCompleteFilter}
          setOpen={setOpen}
          setSelectedValue={setSelectedValue}
        />
      )}
    </div>
  );
};

export default Filter;
