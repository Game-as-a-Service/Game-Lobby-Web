import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function keys<T extends object, K = keyof T>(object: T) {
  return Object.keys(object) as K[];
}
