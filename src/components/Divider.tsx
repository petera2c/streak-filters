const Divider = ({ direction }: { direction: "horizontal" | "vertical" }) => {
  return (
    <div
      className={`bg-slate-300 ${
        direction === "horizontal" ? "h-px w-4" : "w-px h-4"
      }`}
    />
  );
};

export default Divider;
