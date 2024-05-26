import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableColumn from "../../types/TableColumn";
import TableFilterOperator from "../../types/TableFilterOperator";
import Divider from "../Divider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TableFilterValue from "../../types/TableFilterValue";
import FilterEditingStage from "../../types/FilterEditingStage";

const FilterChip = ({
  onClick,
  onDelete,
  removable,
  selectedColumn,
  selectedOperator,
  selectedValue,
}: {
  onClick: (editingStage: FilterEditingStage) => void;
  onDelete?: () => void;
  removable?: boolean;
  selectedColumn?: TableColumn;
  selectedOperator?: TableFilterOperator;
  selectedValue?: TableFilterValue;
}) => {
  const handleFilterChipClick = (
    e: React.MouseEvent<HTMLDivElement>,
    editingStage: FilterEditingStage
  ) => {
    e.stopPropagation();
    onClick(editingStage);
  };

  return (
    <div className="flex items-center border border-solid border-slate-300 rounded cursor-pointer p-1">
      <div className="p-1" onClick={(e) => handleFilterChipClick(e, "column")}>
        {selectedColumn ? selectedColumn.label : "Filter"}
      </div>
      {selectedOperator && (
        <>
          <Divider className="m-1" direction="vertical" />
          <div
            className="p-1"
            onClick={(e) => handleFilterChipClick(e, "operator")}
          >
            {selectedOperator.label}
          </div>
        </>
      )}
      {selectedValue && (
        <>
          <Divider className="m-1" direction="vertical" />
          <div
            className="p-1"
            onClick={(e) => handleFilterChipClick(e, "value")}
          >
            {Array.isArray(selectedValue)
              ? selectedValue?.map((item) => item.label).join(", ")
              : selectedValue?.label || selectedValue?.value}
          </div>
        </>
      )}
      {onDelete && removable && (
        <>
          <Divider className="m-1" direction="vertical" />
          <div
            className="flex items-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <FontAwesomeIcon
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              icon={faClose}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FilterChip;
