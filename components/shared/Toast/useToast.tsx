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

/**
 * Add a component to the toast queue.
 * You can find examples in useToast.stories.tsx
 * @param component {UseToastComponent} The component to be displayed in the toast queue.
 * You can use ToastProps to create Toast or put your own component.
 * @param toastOption {UseToastOptions} Optional. The options of the toast.
 * @param toastOption.targetEl The target element of the toast.
 * Make sure that the target element has a "position: relative;" setting. default: null (means "document.body")
 * @param toastOption.duration The duration of the toast (not including the animation time).
 * negative, NaN, and greater than 10 minutes will be considered as non-automatic closing. default: 3500
 * @param toastOption.position The position of the toast. default: "bottom"
 * @param toastOption.manualClosePlan The manual close plan of the toast. default: "fullBody"
 */
export interface Toaster {
  (component: UseToastComponent, toastOption?: UseToastOptions): void;
}

export interface UseToast {
  (): Toaster;
}

// useToast is a hook that returns a toast function that can be used to add a Toast to the ToastQueue (Context).
// You can find examples of use in the useToast.stories.tsx file.
export const useToast: UseToast = () => {
  const { addToast } = useToastQueueContext();

  return addToast;
};
