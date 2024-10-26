import { useCallback, useEffect, useRef, useState } from "react";

function useAutoReset<T>(initialValue: T, resetDelayMs = 1000) {
  const [internalValue, setInternalValue] = useState(initialValue);
  const timerRef = useRef<NodeJS.Timeout>();

  const clearTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const setValue = useCallback(
    (newValue: T) => {
      setInternalValue(newValue);
      clearTimer();
      timerRef.current = setTimeout(
        () => setInternalValue(initialValue),
        resetDelayMs
      );
    },
    [clearTimer, initialValue, resetDelayMs]
  );

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return [internalValue, setValue] as const;
}

export default useAutoReset;
