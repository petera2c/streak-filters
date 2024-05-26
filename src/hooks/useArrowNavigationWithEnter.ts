import { useState, useEffect, useCallback } from "react";

interface UseArrowNavigationWithEnterProps {
  itemCount: number;
  onEnter: (highlightedIndex?: number) => void;
}

const useArrowNavigationWithEnter = ({
  itemCount,
  onEnter,
}: UseArrowNavigationWithEnterProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key === "ArrowDown" ||
        (event.key === "Tab" && !event.shiftKey)
      ) {
        event.preventDefault();
        setHighlightedIndex((prevIndex = -1) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= itemCount) {
            return 0;
          }
          return nextIndex;
        });
      } else if (
        event.key === "ArrowUp" ||
        (event.key === "Tab" && event.shiftKey)
      ) {
        event.preventDefault();
        setHighlightedIndex((prevIndex = 0) => {
          const nextIndex = prevIndex - 1;
          if (nextIndex < 0) {
            return itemCount - 1;
          }
          return nextIndex;
        });
      } else if (event.key === "Enter") {
        onEnter(highlightedIndex);
      }
    },
    [highlightedIndex, itemCount, onEnter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemCount, handleKeyDown, highlightedIndex, onEnter]);

  return highlightedIndex;
};

export default useArrowNavigationWithEnter;
