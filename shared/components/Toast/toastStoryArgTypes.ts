// share toast storybook arg types
import { RefAttributes } from "react";
import type { ToastProps } from "@/shared/components/Toast/Toast";
import type { ArgTypes } from "@storybook/csf";

export const toastStoryArgTypes: Partial<
  ArgTypes<ToastProps & RefAttributes<HTMLDivElement>>
> = {
  state: {
    control: { type: "select" },
    options: [undefined, "default", "success", "warning", "error", "info"],
  },
  size: {
    control: { type: "select" },
    options: [undefined, "sm", "md", "lg"],
  },
  length: {
    control: { type: "select" },
    options: [undefined, "auto", "sm", "md", "lg"],
  },
  rounded: {
    control: { type: "select" },
    options: [undefined, "none", "sm", "md", "lg", "full"],
  },
  className: {
    control: { type: "text" },
    description:
      "custom class name, try mapped tailwindcss class name: 'bg-red-500'",
    defaultValue: "",
  },
};
