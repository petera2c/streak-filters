import { MouseEvent, ReactNode, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { keyboardListenerStackState } from "../../atoms/keyboardListenerAtom";
import { FILTER_BUILDER } from "../../consts/ComponentNames";

const FilterChipCell = ({
  children,
  isHighlighted,
  onClick,
}: {
  children: ReactNode;
  isHighlighted: boolean;
  onClick: () => void;
}) => {
  const listenerStack = useRecoilValue(keyboardListenerStackState);

  const handleClick = useCallback(
    (e?: MouseEvent<HTMLDivElement>) => {
      e?.stopPropagation();
      onClick();
    },
    [onClick]
  );
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isHighlighted) {
        handleClick();
      }
    };
    if (
      isHighlighted &&
      listenerStack[listenerStack.length - 1] === FILTER_BUILDER
    ) {
      window.addEventListener("keydown", onKeyDown);
    } else {
      window.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isHighlighted, listenerStack, handleClick]);
  return (
    <div
      className={`p-1 ${isHighlighted ? "bg-slate-200" : ""}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default FilterChipCell;
