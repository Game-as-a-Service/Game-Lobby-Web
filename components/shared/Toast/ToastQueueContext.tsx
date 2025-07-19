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
import {
  MAX_TOAST_MOUNT_SIZE,
  MAX_TOAST_QUEUE_SIZE,
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_POSITION,
  DEFAULT_TOAST_MANUAL_CLOSE_PLAN,
  INITIAL_TOAST_POSITION,
  TOAST_QUEUE_STATE,
} from "./constants";
import clsx from "clsx";
import Portal from "@/components/shared/Portal";
import Icon from "@/components/shared/Icon";

interface CtxToastQueueValue {
  addToast: Toaster;
}

const ToastQueueContext = createContext<CtxToastQueueValue>({} as any);
export const useToastQueueContext = () => useContext(ToastQueueContext);

interface CtxToastQueueProviderProps {
  children?: ReactNode;
}

type ToastQueueState =
  (typeof TOAST_QUEUE_STATE)[keyof typeof TOAST_QUEUE_STATE];

const isToastNotAutoClosed = (duration: number) =>
  duration < 0 || isNaN(duration) || duration > 600000;

type ToastQueueValue = {
  id: string;
  value: UseToastComponent;
  state?: ToastQueueState;
  options?: UseToastOptions;
};
type ToastQueueMapValue = ToastQueueValue[];
type ToastQueueMap = Map<null | HTMLElement, ToastQueueMapValue>;
export const ToastQueueProvider: FC<CtxToastQueueProviderProps> = ({
  children,
}) => {
  const [toastQueueMap, setToastQueueMap] = useState<ToastQueueMap>(new Map());
  const toastTimeoutMap = useRef(new Map<string, NodeJS.Timeout>());

  const addToast = useCallback<Toaster>(
    (component: UseToastComponent, toastOption?: UseToastOptions) => {
      // If the toastOption is not set, the toast will be displayed in the body element.
      // find the toast queue of the target element. If it does not exist, create a new one.
      const targetEl = toastOption?.targetEl ?? null;

      setToastQueueMap((prevToastQueueMap) => {
        const targetQueue = prevToastQueueMap.get(targetEl) ?? [];
        const targetQueueSize = targetQueue.length;

        // If the queue is full, ignore the request.
        if (targetQueueSize > MAX_TOAST_QUEUE_SIZE) return prevToastQueueMap;

        // add an uuid and enqueue the toast.
        const id = window.crypto.randomUUID();
        const newQueue: ToastQueueMapValue = [
          { id, value: component, options: toastOption },
          ...targetQueue,
        ];
        return new Map(prevToastQueueMap.set(targetEl, newQueue));
      });
    },
    []
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
      const timeout = toastTimeoutMap.current.get(id);
      if (timeout) {
        clearTimeout(timeout);
        toastTimeoutMap.current.delete(id);
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

    // clear timeout
    const timeout = toastTimeoutMap.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      toastTimeoutMap.current.delete(id);
    }
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
            <Portal key={id} rootId={targetEl.id}>
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
                  {manualClosePlan === "closeButton" && (
                    <button
                      type="button"
                      className={
                        "absolute top-0 right-0 bg-transparent shadow-none text-sm font-bold px-1 py-0.5"
                      }
                      onClick={removeToastHandler}
                    >
                      <Icon name="X" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </Portal>
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
        if (toastTimeoutMap.current.has(id)) return;

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

        toastTimeoutMap.current.set(id, timeout);
      });
    });
  }, [changeToastState, removeToast, toastQueueMap]);

  // remove all timeout when unmount
  useEffect(() => {
    const currentTimeoutMap = toastTimeoutMap.current;

    return () => {
      currentTimeoutMap.forEach((timeout) => {
        clearTimeout(timeout);
      });
      currentTimeoutMap.clear();
    };
  }, []);

  return (
    <ToastQueueContext.Provider value={{ addToast }}>
      {children}
      {mappedToasts}
    </ToastQueueContext.Provider>
  );
};
