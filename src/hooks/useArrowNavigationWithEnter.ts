import { useState, useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { keyboardListenerStackState } from "../atoms/keyboardListenerAtom";
interface UseArrowNavigationWithEnterProps {
  componentId: string;
  direction?: "horizontal" | "vertical";
  itemCount: number;
  onEnter?: (highlightedIndex?: number) => void;
}

const useArrowNavigationWithEnter = ({
  componentId,
  direction = "vertical",
  itemCount,
  onEnter,
}: UseArrowNavigationWithEnterProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>();
  const [listenerStack, setListenerStack] = useRecoilState(
    keyboardListenerStackState
  );

  const forwardKey = direction === "horizontal" ? "ArrowRight" : "ArrowDown";
  const backwardKey = direction === "horizontal" ? "ArrowLeft" : "ArrowUp";

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (listenerStack[listenerStack.length - 1] !== componentId) {
        return;
      }

      if (
        event.key === forwardKey ||
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
        event.key === backwardKey ||
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
        onEnter?.(highlightedIndex);
      }
    },
    [
      backwardKey,
      componentId,
      forwardKey,
      highlightedIndex,
      itemCount,
      listenerStack,
      onEnter,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [itemCount, handleKeyDown, highlightedIndex, onEnter, setListenerStack]);

  useEffect(() => {
    setListenerStack((currentStack) => {
      if (currentStack.includes(componentId)) {
        return currentStack;
      }
      return [...currentStack, componentId];
    });
    return () => {
      setListenerStack((currentStack) =>
        currentStack.filter((l) => l !== componentId)
      );
    };
  }, [componentId, setListenerStack]);

  return { highlightedIndex };
};

export default useArrowNavigationWithEnter;
