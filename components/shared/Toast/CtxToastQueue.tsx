import {
  createContext,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Toast from "@/components/shared/Toast/index";
import {
  Toaster,
  UseToastComponent,
  UseToastOptions,
} from "@/components/shared/Toast/useToast";
import clsx from "clsx";
import { Button } from "@/components/shared/Button";
import Portal from "@/components/shared/Portal";

export interface CtxToastQueueValue {
  addToast: Toaster;
}

export const ToastQueueContext = createContext<CtxToastQueueValue>({} as any);
export const useToastQueueContext = () => useContext(ToastQueueContext);

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
export const ToastQueueProvider: FC<CtxToastQueueProviderProps> = ({
  children,
}) => {
  const [toastQueueMap, setToastQueueMap] = useState<ToastQueueMap>(new Map());
  const [toastTimeoutMap, setToastTimeoutMap] = useState<
    Map<string, NodeJS.Timeout>
  >(new Map());
  const cleanRef = useRef(() =>
    toastTimeoutMap.forEach((timeout) => clearTimeout(timeout))
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
    },
    [toastQueueMap]
  );

  const removeToast = useCallback(
    (id: string) => {
      setToastQueueMap((prev) => {
        const newMap = new Map(prev);
        newMap.forEach((queue) => {
          const index = queue.findIndex((toast) => toast.id === id);
          if (index !== -1) queue.splice(index, 1);
        });
        return newMap;
      });
      // clear timeout
      const timeout = toastTimeoutMap.get(id);
      if (timeout) {
        clearTimeout(timeout);
        setToastTimeoutMap((prev) => {
          const newMap = new Map(prev);
          newMap.delete(id);
          return newMap;
        });
      }
    },
    [toastTimeoutMap]
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
            <Portal key={id} rootId={targetEl.id}>
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
                      className={
                        "absolute top-0 right-0 bg-transparent shadow-none text-sm font-bold px-1 py-0.5"
                      }
                      onClick={removeToastHandler}
                    >
                      X
                    </Button>
                  ) : null}
                </div>
              </div>
            </Portal>
          );
        });
    });
    return allToasts;
  }, [removeToast, toastQueueMap]);

  // set toast lifetime timeout
  useEffect(() => {
    toastQueueMap.forEach((queue) => {
      // only set timeout for the last MAX_TOAST_MOUNT_SIZE toasts
      queue.slice(-MAX_TOAST_MOUNT_SIZE).forEach(({ id, options }) => {
        // ignore if the toast timeout is already set.
        if (toastTimeoutMap.has(id)) return;

        const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
        const removeToastHandler = () => {
          removeToast(id);
        };

        const timeout = setTimeout(removeToastHandler, duration);

        setToastTimeoutMap((prev) => new Map(prev.set(id, timeout)));
      });
    });
  }, [removeToast, toastQueueMap, toastTimeoutMap]);

  // remove all timeout when unmount
  useEffect(() => {
    return cleanRef.current;
  }, []);

  return (
    <ToastQueueContext.Provider value={{ addToast }}>
      {children}
      {mappedToasts}
    </ToastQueueContext.Provider>
  );
};
