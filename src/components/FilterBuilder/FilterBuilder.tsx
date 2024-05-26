import { useState } from "react";
import Filter from "./Filter";
import TableFilter from "../../types/TableFilter";

const FilterBuilder = () => {
  const [filters, setFilters] = useState<TableFilter[]>([]);

  const addFilter = (filter: TableFilter) => {
    setFilters([...filters, filter]);
  };
  const editFilter = (index: number, filter: TableFilter) => {
    const newFilters = [...filters];
    newFilters[index] = filter;
    setFilters(newFilters);
  };
  const removeFilter = (index: number) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };

  return (
    <div className="flex ">
      {filters.map((filter, index) => (
        <Filter
          editFilter={editFilter}
          filter={filter}
          index={index}
          key={index}
          removeFilter={removeFilter}
        />
      ))}
      <Filter addFilter={addFilter} />
    </div>
  );
};

export default FilterBuilder;
