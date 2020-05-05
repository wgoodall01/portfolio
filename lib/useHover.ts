import * as React from "react";
import { useState, useRef, useEffect } from "react";

// Adapted from https://usehooks.com/useHover/

export default function useHover<T extends HTMLElement>(): [
  React.RefObject<T>,
  boolean
] {
  const [value, setValue] = useState(false);

  const ref = useRef<T>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);

        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );

  return [ref, value];
}
