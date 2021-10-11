import { useState, useCallback } from "react";

// FIXME: 3번째 setter 함수 타입 지정
export const useToggle = (initValue: boolean): [boolean, () => void, any] => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(() => {
    setter((prev: boolean) => !prev);
  }, []);
  return [value, handler, setter];
};
