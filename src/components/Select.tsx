import React, { useState } from "react";

const SelectComponent = ({
  options,
  onChange,
}: {
  options: {
    label: string;
    value: string;
  }[];
  onChange: (value: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return <div className="flex flex-col gap-2"></div>;
};

export default SelectComponent;
