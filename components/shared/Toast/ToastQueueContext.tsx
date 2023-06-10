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
import { createPortal } from "react-dom";
import Toast from "@/components/shared/Toast/index";
import {
  Toaster,
  UseToastComponent,
  UseToastOptions,
} from "@/components/shared/Toast/useToast";
import clsx from "clsx";
import { Button } from "@/components/shared/Button";

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

export const TOAST_QUEUE_STATE = {
  entering: "entering",
  entered: "entered",
  exiting: "exiting",
} as const;

export type ToastQueueState =
  typeof TOAST_QUEUE_STATE[keyof typeof TOAST_QUEUE_STATE];

const isToastNotAutoClosed = (duration: number) =>
  duration < 0 || isNaN(duration) || duration > 600000;

export type ToastQueueValue = {
  id: string;
  value: UseToastComponent;
  state?: ToastQueueState;
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

  const changeToastState = useCallback((id: string, state: ToastQueueState) => {
    setToastQueueMap((prev) => {
      const newMap = new Map(prev);
      newMap.forEach((queue) => {
        const index = queue.findIndex((toast) => toast.id === id);
        if (index !== -1) queue[index].state = state;
      });
      return newMap;
    });
    // cleat timeout
    setToastTimeoutMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }, []);

  // toasts should be rendered
  const mappedToasts = useMemo(() => {
    const allToasts: ReactElement[] = [];
    toastQueueMap.forEach((queue) => {
      queue
        .slice(-MAX_TOAST_MOUNT_SIZE)
        .forEach(({ id, value, state, options }, i) => {
          // If the value is a ReactElement, it is a custom toast component.
          const component = "key" in value ? value : <Toast {...value} />;
          const targetEl: HTMLElement = options?.targetEl ?? document.body;
          const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
          const position = options?.position ?? DEFAULT_TOAST_POSITION;
          // prevent permanent toast
          const manualClosePlan = options?.manualClosePlan
            ? isToastNotAutoClosed(duration) &&
              options.manualClosePlan === "none"
              ? DEFAULT_TOAST_MANUAL_CLOSE_PLAN
              : options.manualClosePlan
            : DEFAULT_TOAST_MANUAL_CLOSE_PLAN;

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
                  { "cursor-pointer": manualClosePlan === "fullBody" },
                  { "hover:opacity-90": manualClosePlan === "fullBody" },
                  {
                    "opacity-0": !state || state === TOAST_QUEUE_STATE.exiting,
                  }
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
              </div>,
              targetEl,
              id
            )
          );
        });
    });
    return allToasts;
  }, [removeToast, toastQueueMap]);

  // set toast timeout to change state or remove toast
  useEffect(() => {
    toastQueueMap.forEach((queue) => {
      // only set timeout for the last MAX_TOAST_MOUNT_SIZE toasts
      queue.slice(-MAX_TOAST_MOUNT_SIZE).forEach(({ id, state, options }) => {
        // ignore if the toast timeout is already set.
        if (toastTimeoutMap.has(id)) return;

        let timeout: NodeJS.Timeout;

        // if state undefined, set state to entering
        switch (state) {
          case undefined:
            changeToastState(id, TOAST_QUEUE_STATE.entering);
            // no need to set timeout yet
            return;
          case TOAST_QUEUE_STATE.entering:
            timeout = setTimeout(
              () => changeToastState(id, TOAST_QUEUE_STATE.entered),
              150
            );
            break;
          case TOAST_QUEUE_STATE.entered:
            const duration = options?.duration ?? DEFAULT_TOAST_DURATION;
            // if duration is negative, NaN, or greater than 10 minutes, the toast will not be removed automatically.
            if (isToastNotAutoClosed(duration)) return;

            timeout = setTimeout(
              () => changeToastState(id, TOAST_QUEUE_STATE.exiting),
              duration
            );
            break;
          case TOAST_QUEUE_STATE.exiting:
            timeout = setTimeout(() => removeToast(id), 150);
        }

        setToastTimeoutMap((prev) => new Map(prev.set(id, timeout)));
      });
    });
  }, [changeToastState, removeToast, toastQueueMap, toastTimeoutMap]);

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
