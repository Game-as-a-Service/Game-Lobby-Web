import {
  forwardRef,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactNode,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Toast background color defined by state prop
const TOAST_STATE_CLS = {
  success: "bg-green-500",
  error: "bg-red-500",
  warning: "bg-yellow-500",
  info: "bg-blue-500",
  default: "bg-gray-500",
} as const;

const TOAST_SIZE_CLS = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-xl",
} as const;

const TOAST_ROUNDED_CLS = {
  sm: "rounded-[5px]",
  md: "rounded-[10px]",
  lg: "rounded-[21px]",
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
  const toastBgCls = TOAST_STATE_CLS[state];
  const toastSizeCls = TOAST_SIZE_CLS[size];
  const toastRoundedCls = TOAST_ROUNDED_CLS[rounded];
  const toastLengthCls = TOAST_LENGTH_CLS[length];

  const cls = twMerge(
    clsx(
      [
        "text-white",
        "shadow-lg",
        "px-4",
        "py-2",
        "flex items-center",
        "justify-center",
      ],
      toastBgCls,
      toastSizeCls,
      toastRoundedCls,
      toastLengthCls,
      className
    )
  );

  return (
    <div ref={ref} className={cls} {...restProps}>
      {children}
    </div>
  );
};

export const Toast = forwardRef(InternalToast);
