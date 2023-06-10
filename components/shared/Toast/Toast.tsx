import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// Toast background color defined by state prop
const TOAST_STATE_CLS = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue",
  default: "bg-gray-500",
} as const;

const TOAST_SIZE_CLS = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
} as const;

const TOAST_ROUNDED_CLS = {
  none: "rounded-none",
  sm: "rounded-[5px]",
  md: "rounded-[10px]",
  lg: "rounded-[15px]",
  full: "rounded-full",
} as const;

const TOAST_LENGTH_CLS = {
  auto: "w-auto",
  sm: "w-[200px]",
  md: "w-[350px]",
  lg: "w-[450px]",
} as const;

export type ToastPropState = keyof typeof TOAST_STATE_CLS;
export type ToastPropSize = keyof typeof TOAST_SIZE_CLS;
export type ToastPropRounded = keyof typeof TOAST_ROUNDED_CLS;
export type ToastPropLength = keyof typeof TOAST_LENGTH_CLS;

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  state?: ToastPropState;
  size?: ToastPropSize;
  length?: ToastPropLength;
  rounded?: ToastPropRounded;
  children?: ReactNode;
}

const InternalToast: ForwardRefRenderFunction<HTMLDivElement, ToastProps> = (
  {
    state = "default",
    size = "md",
    rounded = "md",
    length = "auto",
    children,
    className,
    ...restProps
  },
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn(
        "text-white",
        "shadow-lg",
        "px-4",
        "py-2",
        "flex items-center",
        "justify-center",
        TOAST_STATE_CLS[state],
        TOAST_SIZE_CLS[size],
        TOAST_ROUNDED_CLS[rounded],
        TOAST_LENGTH_CLS[length],
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};

export const Toast = forwardRef(InternalToast);
