import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableColumn from "../../types/TableColumn";
import TableFilterOperator from "../../types/TableFilterOperator";
import Divider from "../Divider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TableFilterValue from "../../types/TableFilterValue";
import FilterEditingStage from "../../types/FilterEditingStage";
import FilterChipCell from "./FilterChipCell";
import { FILTER_ITEMS_PER_CHIP } from "./FilterBuilder";

const FilterChip = ({
  highlightedIndex,
  index,
  onClick,
  onDelete,
  removable,
  selectedColumn,
  selectedOperator,
  selectedValue,
}: {
  highlightedIndex?: number;
  index?: number;
  onClick: (editingStage: FilterEditingStage) => void;
  onDelete?: () => void;
  removable?: boolean;
  selectedColumn?: TableColumn;
  selectedOperator?: TableFilterOperator;
  selectedValue?: TableFilterValue;
}) => {
  const handleFilterChipClick = (editingStage: FilterEditingStage) => {
    onClick(editingStage);
  };
  const isFilterChipHighlighted =
    highlightedIndex !== undefined &&
    index !== undefined &&
    highlightedIndex >= index * FILTER_ITEMS_PER_CHIP &&
    highlightedIndex < (index + 1) * FILTER_ITEMS_PER_CHIP;
  const highlightedStageIndex = isFilterChipHighlighted
    ? highlightedIndex % FILTER_ITEMS_PER_CHIP
    : undefined;
  const canEditColumn = !Boolean(selectedOperator);

  return (
    <div className="flex items-center border border-solid border-slate-300 rounded cursor-pointer">
      <FilterChipCell
        onClick={() => {
          if (canEditColumn) handleFilterChipClick("column");
        }}
      >
        {selectedColumn ? selectedColumn.label : "Filter"}
      </FilterChipCell>
      {selectedOperator && (
        <>
          <Divider className="m-1" direction="vertical" />
          <FilterChipCell
            isHighlighted={highlightedStageIndex === 0}
            onClick={() => handleFilterChipClick("operator")}
          >
            {selectedOperator.label}
          </FilterChipCell>
        </>
      )}
      {selectedValue && (
        <>
          <Divider className="m-1" direction="vertical" />
          <FilterChipCell
            isHighlighted={highlightedStageIndex === 1}
            onClick={() => handleFilterChipClick("value")}
          >
            {Array.isArray(selectedValue)
              ? selectedValue?.map((item) => item.label).join(", ")
              : selectedValue?.label || selectedValue?.value}
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
