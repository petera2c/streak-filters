import { ReactNode, useRef, useState } from "react";
import Input from "./Input";
import useOnOutsideClick from "../hooks/useOnOutsideClick";

type Option = {
  label: string;
  value: string | boolean | number;
};

const Select = ({
  dropdownRender,
  mode = "default",
  options,
  onChange,
  onEnter,
  open,
  setOpen,
  showSearch,
  value,
}: {
  dropdownRender?: ReactNode;
  mode?: "multiple" | "default";
  options?: Option[];
  onChange?: (option: any) => void;
  onEnter?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  showSearch?: boolean;
  value?: Option | Option[];
}) => {
  const ref = useRef(null);

  const [search, setSearch] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setOpen(false);
      onEnter?.();
    }
  };

  const filteredOptions = options?.filter((option) => {
    return option.label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div
      className="relative flex gap-2"
      onKeyDown={handleKeyDown}
      ref={ref}
      tabIndex={0}
    >
      {open && (
        <div className="absolute left-0 top-full pt-4">
          {dropdownRender ? (
            dropdownRender
          ) : (
            <div
              className="bg-white border border-slate-300 border-solid rounded shadow-md overflow-auto"
              style={{ maxHeight: "200px" }}
            >
              {showSearch && (
                <div className="border-b border-solid border-slate-300">
                  <Input
                    autoFocus
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    value={search}
                  />
                </div>
              )}
              {filteredOptions?.map((option, index) => {
                let isSelected = false;
                if (Array.isArray(value))
                  isSelected = value.some((v) => v.value === option.value);
                else isSelected = value?.value === option.value;

                return (
                  <div
                    className={`px-4 py-1 cursor-pointer transition ${
                      isSelected ? "bg-blue-300" : "hover:bg-slate-300"
                    }`}
                    key={index}
                    onClick={() => onChange?.(option)}
                  >
                    {option.label}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
