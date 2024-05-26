import { useState } from "react";
import Filter from "./Filter";

const FilterBuilder = () => {
  const [filters, setFilters] = useState([]);

  return (
    <div className="flex flex-wrap">
      {filters.map((filter, index) => (
        <Filter key={index} filter={filter} />
      ))}
      <Filter />
    </div>
  );
};

export default FilterBuilder;
