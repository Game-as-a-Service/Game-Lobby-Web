import { Key } from "react";
import { cn } from "@/lib/utils";
export interface TabProps {
  /**
   * The label of key
   */
  tabKey: Key;
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
  onTabClick?: (tabKey: Key) => void;
}

export default function Tab(props: TabProps) {
  const { tabKey, label, className, active, onTabClick } = props;

  const tabBaseClass = ` w-fit py-3 text-center text-base text-white relative  after:content-'' after:w-full after:h-[4px] after:block after:absolute after:bottom-0 after:left-0  after:transition-colors hover:after:bg-[#5865F2]`;

  const tabActiveClass = active && "is-active after:bg-[#5865F2]";

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
