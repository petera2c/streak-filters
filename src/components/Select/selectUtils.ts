import SelectOption from "../../types/SelectOption";

export const getIsSelected = ({
  value,
  option,
}: {
  option: SelectOption;
  value?: SelectOption | SelectOption[];
}) => {
  let isSelected = false;

  if (Array.isArray(value))
    isSelected = value.some((v) => v.value === option.value);
  else isSelected = value?.value === option.value;

  return isSelected;
};
