import {
  createContext,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Toast from "@/shared/components/Toast/index";
import {
  Toaster,
  UseToastComponent,
  UseToastOptions,
} from "@/shared/components/Toast/useToast";
import clsx from "clsx";
import { Button } from "@/shared/components/Button";

export interface CtxToastQueueValue {
  addToast: Toaster;
}

export const CtxToastQueue = createContext<CtxToastQueueValue>({} as any);
export const useCtxToastQueue = () => useContext(CtxToastQueue);

export const MAX_TOAST_QUEUE_SIZE = 100;
export const MAX_TOAST_MOUNT_SIZE = 6;
export const DEFAULT_TOAST_DURATION = 3500;
export const DEFAULT_TOAST_POSITION = "bottom";
export const DEFAULT_TOAST_MANUAL_CLOSE_PLAN = "fullBody";
export const INITIAL_TOAST_POSITION: Record<
  Required<UseToastOptions>["position"],
  string
> = {
  top: "top-[11px] left-1/2",
  "top-left": "top-[11px] left-[11px]",
  "top-right": "top-[11px] right-[11px]",
  bottom: "bottom-[11px] left-1/2",
  "bottom-left": "bottom-[11px] left-[11px]",
  "bottom-right": "bottom-[11px] right-[11px]",
};

export interface CtxToastQueueProviderProps {
  children?: ReactNode;
}

export type ToastQueueValue = {
  id: string;
  value: UseToastComponent;
  options?: UseToastOptions;
};
export type ToastQueueMapValue = ToastQueueValue[];
export type ToastQueueMap = Map<null | HTMLElement, ToastQueueMapValue>;
export const CtxToastQueueProvider: FC<CtxToastQueueProviderProps> = ({
  children,
}) => {
  const [toastQueueMap, setToastQueueMap] = useState<ToastQueueMap>(new Map());
  const [toastTimeoutSet, setToastTimeoutSet] = useState<Set<string>>(
    new Set()
  );

  const addToast = useCallback<Toaster>(
    (component: UseToastComponent, toastOption?: UseToastOptions) => {
      // If the toastOption is not set, the toast will be displayed in the body element.
      // find the toast queue of the target element. If it does not exist, create a new one.
      const targetEl = toastOption?.targetEl ?? null;
      const targetQueue = toastQueueMap.get(targetEl) ?? [];
      const targetQueueSize = targetQueue.length;

      // If the queue is full, ignore the request.
      if (targetQueueSize > MAX_TOAST_QUEUE_SIZE) return;

      // add an uuid and enqueue the toast.
      const id = window.crypto.randomUUID();
      const newQueue: ToastQueueMapValue = [
        { id, value: component, options: toastOption },
        ...targetQueue,
      ];
      setToastQueueMap(new Map(toastQueueMap.set(targetEl, newQueue)));

      //
    },
    [toastQueueMap]
  );

  const removeToast = useCallback(
    (id: string) => {
      const newToastQueueMap = new Map(toastQueueMap);
      newToastQueueMap.forEach((queue, key) => {
        const newQueue = queue.filter((toast) => toast.id !== id);
        newToastQueueMap.set(key, newQueue);
      });
      setToastQueueMap(newToastQueueMap);
      if (toastTimeoutSet.has(id))
        setToastTimeoutSet((prev) => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
    },
    [toastQueueMap, toastTimeoutSet]
  );

  const findToastQueueValue = useCallback(
    (id: string) => {
      let toastQueueValue: ToastQueueValue | undefined;
      toastQueueMap.forEach((queue) => {
        const toast = queue.find((toast) => toast.id === id);
        if (toast) toastQueueValue = toast;
      });
      return toastQueueValue;
    },
    [toastQueueMap]
  );

  const mappedToasts = useMemo(() => {
    const allToasts: ReactElement[] = [];
    toastQueueMap.forEach((queue) => {
      queue
        .slice(-MAX_TOAST_MOUNT_SIZE)
        .forEach(({ id, value, options }, i) => {
          // If the value is a ReactElement, it is a custom toast component.
          const component = "key" in value ? value : <Toast {...value} />;
          const targetEl: HTMLElement = options?.targetEl ?? document.body;
          const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
          const position = options?.position ?? DEFAULT_TOAST_POSITION;
          const manualClosePlan =
            options?.manualClosePlan ?? DEFAULT_TOAST_MANUAL_CLOSE_PLAN;

          const removeToastHandler = removeToast.bind(null, id);

          const positionSplit = position.split("-");

          const style: CSSProperties = {
            transform: `translate(${positionSplit[1] ? "0" : "-50%"}, 
            calc(${positionSplit[0] === "top" ? 1 : -1} * (${i} * 100% + ${
              i * 11
            }px))`,
          };

          allToasts.push(
            createPortal(
              <div
                className={clsx(
                  `flex justify-center z-[1400] transition-all duration-500`,
                  targetEl === document.body ? "fixed" : "absolute",
                  INITIAL_TOAST_POSITION[position],
                  { "cursor-pointer": manualClosePlan === "fullBody" }
                )}
                style={style}
                onClick={
                  manualClosePlan === "fullBody"
                    ? removeToastHandler
                    : undefined
                }
              >
                <div className="relative">
                  {component}
                  {manualClosePlan === "closeButton" ? (
                    <Button
                      className={"absolute top-0 right-0"}
                      onClick={removeToastHandler}
                    >
                      X
                    </Button>
                  ) : null}
                </div>
              </div>,
              targetEl,
              id
            )
          );
        });
    });
    return allToasts;
  }, [removeToast, toastQueueMap]);

  // set toast remove timeout
  // useEffect(() => {
  //   toastQueueMap.forEach((queue) => {
  //     queue.slice(-MAX_TOAST_MOUNT_SIZE).forEach(({ id, options }, i) => {
  //       const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
  //       const removeToastHandler = removeToast.bind(null, id);
  //       setToastTimeoutSet((prev) => {
  //         if (prev.has(id)) return prev;
  //         setTimeout(removeToastHandler, duration);
  //         return new Set(prev.add(id));
  //       });
  //     });
  //   });
  // }, [removeToast, toastQueueMap]);

  return (
    <CtxToastQueue.Provider value={{ addToast }}>
      {children}
      {mappedToasts}
    </CtxToastQueue.Provider>
  );
};
