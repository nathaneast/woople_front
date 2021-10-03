import { useState, useCallback } from "react";

export const useBool = (initValue: boolean) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(() => {
    setter((prev: boolean) => !prev);
  }, []);
  return [value, handler, setter];
};
