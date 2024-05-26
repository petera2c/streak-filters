import { ReactNode, useRef, useState } from "react";
import Input from "./Input";

type Option = {
  label: string;
  value: string | boolean | number;
};

const Select = ({
  dropdownRender,
  mode = "default",
  options,
  onChange,
  open,
  setOpen,
  showSearch,
  value,
}: {
  dropdownRender?: ReactNode;
  mode?: "multiple" | "default";
  options?: Option[];
  onChange?: (option: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  showSearch?: boolean;
  value?: Option | Option[];
}) => {
  // Refs
  const ref = useRef(null);

  // Local state
  const [search, setSearch] = useState("");

  // Derived state
  const filteredOptions = options?.filter((option) => {
    return option.label.toLowerCase().includes(search.toLowerCase());
  });
  const canSelectMultiple = mode === "multiple";

  // Handlers
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };
  const optionOnClick = ({
    isSelected,
    option,
  }: {
    isSelected: boolean;
    option: Option;
  }) => {
    if (canSelectMultiple) {
      if (Array.isArray(value)) {
        if (isSelected) {
          onChange?.(value.filter((v) => v.value !== option.value));
        } else {
          onChange?.(value.concat([option]));
        }
      } else {
        onChange?.([option]);
      }
    } else onChange?.(option);
  };

  return (
    <div className="relative flex gap-2" onKeyDown={handleKeyDown} ref={ref}>
      {open && (
        <div className="absolute left-0 top-full pt-4">
          {dropdownRender ? (
            dropdownRender
          ) : (
            <div className="bg-white border border-slate-300 border-solid rounded shadow-md">
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
              <div className="overflow-auto" style={{ maxHeight: "200px" }}>
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
                      onClick={() => optionOnClick({ isSelected, option })}
                      data-value={option.value}
                      tabIndex={0}
                    >
                      {option.label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
