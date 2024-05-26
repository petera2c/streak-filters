import React from "react";

type CheckboxProps = {
  onChange: (value: boolean) => void;
  value: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ onChange, value }) => {
  return (
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
};

export default Checkbox;
