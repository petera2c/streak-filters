import { MutableRefObject, useEffect } from "react";

const useOnOutsideClick = (
  ref: MutableRefObject<any>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export default useOnOutsideClick;
