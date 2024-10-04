import { cn } from "@/lib/utils";
import { Key } from "react";

export interface TabProps<T extends Key = string> {
  /**
   * The key of tab
   */
  tabKey: T;
  /**
   * The label of tab
   */
  label?: string;
  /**
   * Whether the tab is active.
   * Controlled by tabs.
   */
  isActive?: boolean;
  /**
   * Callback executed when tab is clicked
   */
  onClick?: (tabKey: T) => void;
}

export default function Tab<T extends Key = string>(props: TabProps<T>) {
  const { tabKey, label, isActive, onClick } = props;

  return (
    <button
      className={cn(
        "relative py-3 px-5 text-base text-grey-400 font-normal border-b border-primary-800 transition-colors",
        "after:content-'' after:w-full after:h-[3px] after:absolute after:-bottom-0.5 after:left-0",
        isActive && "text-primary-200 font-medium after:gradient-purple"
      )}
      role="tab"
      aria-selected={isActive}
      aria-controls={label}
      onClick={() => onClick?.(tabKey)}
    >
      <span>{label}</span>
    </button>
  );
}
