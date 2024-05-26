import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableColumn from "../../types/TableColumn";
import TableFilterOperator from "../../types/TableFilterOperator";
import Divider from "../Divider";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import TableFilterValue from "../../types/TableFilterValue";

const FilterChip = ({
  onClick,
  onDelete,
  removable,
  selectedColumn,
  selectedOperator,
  selectedValue,
}: {
  onClick: () => void;
  onDelete?: () => void;
  removable?: boolean;
  selectedColumn?: TableColumn;
  selectedOperator?: TableFilterOperator;
  selectedValue?: TableFilterValue;
}) => {
  return (
    <div
      className="flex items-center border border-solid border-slate-300 rounded px-2 py-1 gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div>{selectedColumn ? selectedColumn.label : "Filter"}</div>
      {selectedColumn && (
        <>
          <Divider direction="vertical" />
          <div>{selectedOperator ? selectedOperator.label : "Operation"}</div>
        </>
      )}
      {selectedOperator && (
        <>
          <Divider direction="vertical" />
          <div>{selectedValue}</div>
        </>
      )}
      {onDelete && removable && (
        <>
          <Divider direction="vertical" />
          <FontAwesomeIcon
            className="text-slate-500 cursor-pointer"
            icon={faClose}
            onClick={onDelete}
          />
        </>
      )}
    </div>
  );
};

export default FilterChip;
