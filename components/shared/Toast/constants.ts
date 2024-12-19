import { UseToastOptions } from "./useToast";

export const MAX_TOAST_QUEUE_SIZE = 100;
export const MAX_TOAST_MOUNT_SIZE = 6;
export const DEFAULT_TOAST_DURATION = 3500;
export const DEFAULT_TOAST_POSITION = "top";
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
export const TOAST_QUEUE_STATE = {
  entering: "entering",
  entered: "entered",
  exiting: "exiting",
} as const;
