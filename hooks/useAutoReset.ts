import { useCallback, useEffect, useRef, useState } from "react";

function useAutoReset<T>(initialValue: T, resetDelayMs = 1000, enabled = true) {
  const [internalValue, setInternalValue] = useState(initialValue);
  const timerRef = useRef<NodeJS.Timeout>();
  const prevEnabledRef = useRef(enabled);

  const clearTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const setValue = useCallback(
    (newValue: T) => {
      setInternalValue(newValue);
      clearTimer();
      if (!enabled) return;
      timerRef.current = setTimeout(
        () => setInternalValue(initialValue),
        resetDelayMs
      );
    },
    [clearTimer, initialValue, resetDelayMs, enabled]
  );

  useEffect(() => {
    if (prevEnabledRef.current === enabled) return;
    prevEnabledRef.current = enabled;
    if (!enabled) {
      clearTimer();
      return;
    }
    timerRef.current = setTimeout(
      () => setInternalValue(initialValue),
      resetDelayMs
    );
  }, [clearTimer, enabled, resetDelayMs, initialValue]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return [internalValue, setValue] as const;
}

export default useAutoReset;
