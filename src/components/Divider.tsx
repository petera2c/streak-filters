import React from "react";

type DividerProps = {
  direction: "horizontal" | "vertical";
} & React.HTMLAttributes<HTMLDivElement>;

const Divider = ({ direction, ...props }: DividerProps) => {
  return (
    <div
      {...props}
      className={`bg-slate-300 ${
        direction === "horizontal" ? "h-px w-4" : "w-px h-4"
      } ${props.className || ""}`}
    />
  );
};

export default Divider;
