import React, { ReactNode, useRef, useState } from "react";
import Input from "./Input";
import useOnOutsideClick from "../hooks/useOnOutsideClick";

type Option = {
  label: string;
  value: string | boolean;
};

const Select = ({
  dropdownRender,
  options,
  onChange,
  showSearch,
  title,
  value,
}: {
  dropdownRender?: ReactNode;
  options: Option[];
  onChange: (option: any) => void;
  showSearch?: boolean;
  title?: string | ReactNode;
  value?: Option;
}) => {
  const ref = useRef(null);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useOnOutsideClick(ref, () => {
    setOpen(false);
    setIsFocused(false);
  });

  return (
    <div className="relative flex gap-2" ref={ref}>
      <div onClick={() => setOpen(true)}>
        {title ? title : value ? value.label : "Select"}
      </div>
      {(open || isFocused) && (
        <div className="absolute left-0 top-full pt-4">
          <div
            className="bg-white border border-slate-300 border-solid rounded shadow-md overflow-auto"
            style={{ maxHeight: "200px" }}
          >
            {showSearch && (
              <div className="border-b border-solid border-slate-300">
                <Input
                  autoFocus
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  placeholder="Search"
                  value={search}
                />
              </div>
            )}
            {options.map((option, index) => {
              const isSelected = value?.value === option.value;
              return (
                <div
                  className={`px-4 py-1 cursor-pointer transition ${
                    isSelected ? "bg-blue-300" : "hover:bg-slate-300"
                  }`}
                  key={index}
                  onClick={() => onChange(option)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
