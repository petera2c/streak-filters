import { useEffect, useState } from "react";
import TableFilter from "../../types/TableFilter";
import useArrowNavigationWithEnter from "../../hooks/useArrowNavigationWithEnter";
import { FILTER_BUILDER } from "../../consts/ComponentNames";
import FilterChip from "./FilterChip";

export const FILTER_ITEMS_PER_CHIP = 3;

const FilterBuilder = () => {
  // Local state
  const [filters, setFilters] = useState<TableFilter[]>([]);

  // Hooks
  const itemCount = filters.length * FILTER_ITEMS_PER_CHIP + 1;
  const { highlightedIndex, setHighlightedIndex } = useArrowNavigationWithEnter(
    {
      componentId: FILTER_BUILDER,
      direction: "horizontal",
      // 4 is the number of filter items + 1 for the add filter button
      itemCount,
    }
  );

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

  // Ensure highlightedIndex is within the bounds of the itemCount
  useEffect(() => {
    if (highlightedIndex && highlightedIndex > itemCount) {
      setHighlightedIndex(itemCount - 1);
    }
  }, [highlightedIndex, itemCount, setHighlightedIndex]);

  return (
    <div className="flex flex-wrap gap-2 pr-8 w-full">
      {filters.map((filter, index) => (
        <FilterChip
          editFilter={editFilter}
          filter={filter}
          highlightedIndex={highlightedIndex}
          index={index}
          key={index}
          onDelete={() => index !== undefined && removeFilter?.(index)}
          removable={index !== undefined && Boolean(removeFilter)}
        />
      ))}
      <FilterChip
        addFilter={addFilter}
        highlightedIndex={highlightedIndex}
        index={filters.length}
      />
    </div>
  );
};

export default FilterBuilder;
