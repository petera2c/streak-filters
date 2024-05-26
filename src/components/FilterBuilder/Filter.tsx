import { useState } from "react";
import TableFilter from "../../types/TableFilter";
import Select from "../Select";
import { DEMO_COLUMNS } from "../../consts/DemoData";
import TableColumn from "../../types/TableColumn";
import { getOperators } from "./FilterBuilderUtils";
import Divider from "../Divider";
import Input from "../Input";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Filter = ({ filter }: { filter?: TableFilter }) => {
  // Local state
  const [selectedColumn, setSelectedColumn] = useState<TableColumn>();
  const [selectedOperator, setSelectedOperator] = useState<{
    label: string;
    value: string;
  }>();
  const [selectedValue, setSelectedValue] = useState<string>();

  const options = selectedColumn ? getOperators(selectedColumn) : DEMO_COLUMNS;

  return (
    <Select
      dropdownRender={
        selectedColumn && selectedOperator ? (
          <Input
            onChange={(e) => setSelectedValue(e.target.value)}
            value={selectedValue}
          />
        ) : undefined
      }
      options={options}
      onChange={(value) => {
        if (!selectedColumn) {
          setSelectedColumn(value);
        } else if (!selectedOperator) {
          setSelectedOperator(value);
        }
      }}
      showSearch
      title={
        <div className="flex items-center border border-solid border-slate-300 rounded px-2 py-1 gap-2">
          <div>{selectedColumn ? selectedColumn.label : "Column"}</div>
          <Divider direction="vertical" />
          <div>{selectedOperator ? selectedOperator.label : "Operation"}</div>
          <Divider direction="vertical" />
          <div>{selectedValue ? selectedValue : "Value"}</div>
          <Divider direction="vertical" />
          <FontAwesomeIcon
            className="text-slate-500 cursor-pointer"
            icon={faClose}
          />
        </div>
      }
      value={selectedColumn}
    />
  );
};

export default Filter;
