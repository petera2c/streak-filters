import { useState } from "react";
import Filter from "./Filter";
import TableFilter from "../../types/TableFilter";
import useArrowNavigationWithEnter from "../../hooks/useArrowNavigationWithEnter";
import { FILTER_BUILDER } from "../../consts/ComponentNames";

const FILTER_ITEMS_PER_CHIP = 4;

const FilterBuilder = () => {
  // Local state
  const [filters, setFilters] = useState<TableFilter[]>([]);

  // Hooks
  const highlightedIndex = useArrowNavigationWithEnter({
    componentId: FILTER_BUILDER,
    direction: "horizontal",
    // 4 is the number of filter items + 1 for the add filter button
    itemCount: filters.length * FILTER_ITEMS_PER_CHIP + 1,
  });

  // Handlers
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
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <Filter
          editFilter={editFilter}
          filter={filter}
          highlightedIndex={highlightedIndex}
          index={index}
          key={index}
          removeFilter={removeFilter}
        />
      ))}
      <Filter
        addFilter={addFilter}
        highlightedIndex={highlightedIndex}
        index={filters.length}
      />
    </div>
  );
};

export default FilterBuilder;
