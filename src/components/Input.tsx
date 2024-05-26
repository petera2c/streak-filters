import { InputHTMLAttributes } from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="rounded px-2 py-1" {...props} />;
};

export default Input;
