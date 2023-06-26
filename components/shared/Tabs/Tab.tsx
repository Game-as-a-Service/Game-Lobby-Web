import { cn } from "@/lib/utils";
import { Key } from "react";
interface TabProps<T extends Key = string> {
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
  active?: boolean;
  /**
   * The className of tab
   */
  className?: string;
  /**
   * Callback executed when tab is clicked
   */
  onTabClick?: (tabKey: T) => void;
}

export default function Tab<T extends Key = string>(props: TabProps<T>) {
  const { tabKey, label, className, active, onTabClick } = props;

  const tabBaseClass = ` w-fit py-3 text-center text-base text-white relative  after:content-'' after:w-full after:h-[4px] after:block after:absolute after:bottom-0 after:left-0  after:transition-colors hover:after:bg-[#2F88FF]`;

  const tabActiveClass = active && "is-active after:bg-[#2F88FF]";

  const tabClass = cn(tabBaseClass, tabActiveClass, className);

  return (
    <button
      className={tabClass}
      role="tab"
      aria-selected={active}
      aria-controls={label}
      onClick={() => onTabClick && onTabClick(tabKey)}
    >
      <span>{label}</span>
    </button>
  );
}
