import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onEnter?: () => void;
};

const Input = ({ onEnter, ...props }: InputProps) => {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onEnter) {
      e.stopPropagation();
      onEnter();
    }
  };
  return (
    <input className="rounded px-2 py-1" onKeyDown={onKeyDown} {...props} />
  );
};

export default Input;
