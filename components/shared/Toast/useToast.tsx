import { ReactElement } from "react";
import { useToastQueueContext } from "@/components/shared/Toast/ToastQueueContext";
import { ToastProps } from "@/components/shared/Toast/Toast";

export interface UseToastOptions {
  // The target Toast bound to (ref.current) element.
  // If undefined, it is bound to the body element, and Toast has a fixed position.
  // Otherwise, it has an absolute position.
  // When targetEl is set, please ensure that targetEl has a "position: relative;" setting.
  targetEl?: HTMLElement | null;
  // The duration in milliseconds (ms) for which the Toast stays visible.
  // Values outside the range of 0 <= duration < 600000 (10 minutes) will be considered as non-automatic closing.
  // The manualClosePlan cannot be set to "none".
  duration?: number;
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right";
  manualClosePlan?: "fullBody" | "closeButton" | "none";
}

export type UseToastComponent = ToastProps | ReactElement;
export interface Toaster {
  (component: UseToastComponent, toastOption?: UseToastOptions): void;
}

export interface UseToast {
  (): Toaster;
}

export const useToast: UseToast = () => {
  const { addToast } = useToastQueueContext();

  return addToast;
};
