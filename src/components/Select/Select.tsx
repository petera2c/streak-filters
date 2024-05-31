import { ReactNode, useRef, useState } from "react";
import Input from "../Input";
import Checkbox from "../Checkbox";
import useArrowNavigationWithEnter from "../../hooks/useArrowNavigationWithEnter";
import SelectOption from "../../types/SelectOption";
import { getIsSelected } from "./selectUtils";

type SelectProps = {
  descriptionText?: string;
  dropdownRender?: ReactNode;
  mode?: "multiple" | "default";
  options?: SelectOption[];
  onChange?: (option: any) => void;
  onEnter?: () => void;
  setOpen: (open: boolean) => void;
  showSearch?: boolean;
  value?: SelectOption | SelectOption[];
};

export type SelectWrapperProps = SelectProps & {
  open: boolean;
};

const SelectWrapper = ({ open, ...props }: SelectWrapperProps) => {
  if (!open) return null;
  return <Select {...props} />;
};

const Select = ({
  descriptionText,
  dropdownRender,
  mode = "default",
  options,
  onChange,
  onEnter,
  setOpen,
  showSearch,
  value,
}: SelectProps) => {
  // Refs
  const ref = useRef(null);

  // Local state
  const [search, setSearch] = useState("");

  // Derived state
  const filteredOptions = options?.filter((option) => {
    return option.label.toLowerCase().includes(search.toLowerCase());
  });
  const canSelectMultiple = mode === "multiple";

  // Custom hooks
  const { highlightedIndex } = useArrowNavigationWithEnter({
    componentId: "select",
    itemCount: filteredOptions?.length || 0,
    onEnter: (highlightedIndex) => {
      if (highlightedIndex !== undefined) {
        const option = filteredOptions?.[highlightedIndex];
        if (option) {
          const isSelected = getIsSelected({ option, value });
          optionOnClick({ isSelected, option });
        }
      }

      onEnter?.();
    },
  });

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
    option: SelectOption;
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
    <div
      className="absolute left-0 top-full pt-1"
      onKeyDown={handleKeyDown}
      ref={ref}
    >
      <div className="flex flex-col gap-1">
        <div className="bg-white border border-slate-300 border-solid rounded shadow-md">
          {dropdownRender ? (
            dropdownRender
          ) : (
            <>
              {showSearch && (
                <div className="border-b border-solid border-slate-300">
                  <Input
                    autoFocus
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Search"}
                    value={search}
                  />
                </div>
              )}
              <div className="overflow-auto" style={{ maxHeight: "200px" }}>
                {filteredOptions?.map((option, index) => {
                  const isSelected = getIsSelected({ option, value });
                  return (
                    <div
                      className={`flex gap-2 px-4 py-1 whitespace-nowrap border-2 border-solid cursor-pointer transition rounded ${
                        isSelected ? "bg-blue-300" : "hover:bg-slate-300"
                      } ${
                        highlightedIndex === index
                          ? "border-blue-600"
                          : "border-transparent"
                      }`}
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        optionOnClick({ isSelected, option });
                      }}
                    >
                      {canSelectMultiple && (
                        <Checkbox
                          onChange={() => optionOnClick({ isSelected, option })}
                          value={isSelected}
                        />
                      )}
                      {option.label}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        {descriptionText && (
          <div className="text-xs text-slate-400">{descriptionText}</div>
        )}
      </div>
    </div>
  );
};

export default SelectWrapper;
