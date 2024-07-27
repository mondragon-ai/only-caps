import { useEffect, useState } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (window) {
      setWidth(window.innerWidth);
    }
  }, []);
  return width;
};
