import { RefObject, useCallback, useEffect, useRef } from "react";

type ElementNode = Element | Element[] | null;

interface UseResizeObserverProps {
  elementRef: RefObject<ElementNode>;
  callback: (entries: ResizeObserverEntry) => void;
}

export default function useResizeObserver({
  elementRef,
  callback,
}: UseResizeObserverProps) {
  const observerRef = useRef<ResizeObserver>();
  const internalElementRef = useRef<ElementNode>();
  const internalCallback = useCallback(
    (entries: ResizeObserverEntry[]) => entries.forEach(callback),
    [callback]
  );
  const setInternalElementRef = useCallback(
    (node: ElementNode) => {
      observerRef.current?.disconnect();
      observerRef.current = new ResizeObserver(internalCallback);

      if (Array.isArray(node)) {
        node.forEach((_node) => observerRef.current?.observe(_node));
      } else if (node) {
        observerRef.current.observe(node);
      }

      internalElementRef.current = node;
    },
    [internalCallback]
  );

  useEffect(() => {
    const element = elementRef?.current;

    if (element) setInternalElementRef(element);

    return () => observerRef.current?.disconnect();
  }, [elementRef, setInternalElementRef]);

  return {
    observerRef,
    setInternalElementRef,
  };
}
