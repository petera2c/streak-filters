import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableColumn from "../../types/TableColumn";
import TableFilterOperator from "../../types/TableFilterOperator";
import Divider from "../Divider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TableFilterValue from "../../types/TableFilterValue";
import FilterEditingStage from "../../types/FilterEditingStage";
import FilterChipCell from "./FilterChipCell";
import { FILTER_ITEMS_PER_CHIP } from "./FilterBuilder";
import { useCallback, useEffect, useRef, useState } from "react";
import TableFilter from "../../types/TableFilter";
import useOnOutsideClick from "../../hooks/useOnOutsideClick";
import { BOOLEAN_OPERATORS } from "../../consts/Operators";
import FilterSelectColumn from "./FilterSelectColumn";
import FilterSelectOperator from "./FilterSelectOperator";
import FilterSelectValue from "./FilterSelectValue";

const FilterChip = ({
  addFilter,
  editFilter,
  filter,
  highlightedIndex,
  index,
  onDelete,
  removable,
}: {
  addFilter?: (filter: TableFilter) => void;
  editFilter?: (index: number, filter: TableFilter) => void;
  filter?: TableFilter;
  highlightedIndex?: number;
  index?: number;
  onDelete?: () => void;
  removable?: boolean;
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
  const isFilterChipHighlighted =
    highlightedIndex !== undefined &&
    index !== undefined &&
    highlightedIndex >= index * FILTER_ITEMS_PER_CHIP &&
    highlightedIndex < (index + 1) * FILTER_ITEMS_PER_CHIP;
  const highlightedStageIndex = isFilterChipHighlighted
    ? highlightedIndex % FILTER_ITEMS_PER_CHIP
    : undefined;
  const canEditColumn = !Boolean(selectedColumn);

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
  const handleFilterChipClick = (editingStage: FilterEditingStage) => {
    setCurrentlyEditing(editingStage);
    setOpen(true);
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
    <div
      className="flex items-center border border-solid border-slate-300 rounded cursor-pointer"
      ref={filterRef}
    >
      <FilterChipCell
        isHighlighted={highlightedStageIndex === 0 && canEditColumn}
        onClick={() => {
          if (canEditColumn) handleFilterChipClick("column");
        }}
      >
        {selectedColumn ? selectedColumn.label : "Filter"}
        {currentlyEditing === "column" && (
          <FilterSelectColumn
            onChange={onColumnChange}
            open={open}
            selectedColumn={selectedColumn}
            setOpen={setOpen}
          />
        )}
      </FilterChipCell>
      {selectedColumn && (
        <>
          <Divider className="m-1" direction="vertical" />
          <FilterChipCell
            isHighlighted={highlightedStageIndex === 0}
            onClick={() => handleFilterChipClick("operator")}
          >
            {selectedOperator ? selectedOperator.label : <>&nbsp;</>}

            {selectedColumn && currentlyEditing === "operator" && (
              <FilterSelectOperator
                onChange={onOperatorChange}
                open={open}
                selectedColumn={selectedColumn}
                selectedOperator={selectedOperator}
                setOpen={setOpen}
              />
            )}
          </FilterChipCell>
        </>
      )}
      {selectedOperator && (
        <>
          <Divider className="m-1" direction="vertical" />
          <FilterChipCell
            isHighlighted={highlightedStageIndex === 1}
            onClick={() => handleFilterChipClick("value")}
          >
            {Array.isArray(selectedValue)
              ? selectedValue?.map((item) => item.label).join(", ")
              : selectedValue?.label || selectedValue?.value || <>&nbsp;</>}
            {selectedColumn &&
              selectedOperator &&
              currentlyEditing === "value" && (
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
          </FilterChipCell>
        </>
      )}
      {onDelete && removable && (
        <>
          <Divider className="m-1" direction="vertical" />
          <FilterChipCell
            isHighlighted={highlightedStageIndex === 2}
            onClick={() => {
              onDelete();
            }}
          >
            <FontAwesomeIcon
              className="flex items-center text-slate-400 hover:text-slate-600 transition-colors p-1"
              icon={faClose}
            />
          </FilterChipCell>
        </>
      )}
    </div>
  );
};

export default FilterChip;
