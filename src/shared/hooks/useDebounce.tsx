import { useCallback, useEffect, useRef } from "react";
const useDebounce = (cb: (...args: unknown[]) => void, ms: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return useCallback(
    (...args: unknown[]) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => cb(...args), ms);
    },
    [cb, ms],
  );
};

export default useDebounce;
