import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** @param time - 等待毫秒數 */
export const wait = (time: number) =>
  new Promise((res) => setTimeout(res, time));
