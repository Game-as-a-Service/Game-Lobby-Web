import { useState, Key, ReactNode } from "react";
import Tab from "./Tab";
import { cn } from "@/lib/utils";
export interface TabItemType {
  key: Key;
  label?: string;
}

export type TabSizeType = "default" | "large";

export interface TabsProps {
  /**
   * The array of tabItem to render tabBar
   */
  tabs: TabItemType[];
  /**
   * Initial active tab's key
   */
  defaultActiveKey?: Key;
  /**
   * The className of tabs that wraps tabBar and tabPane
   */
  tabsClass?: string;
  /**
   * The className of tabBar that wraps the tab
   */
  tabBarClass?: string;
  /**
   * The className of tab
   */
  tabClass?: string;
  /**
   * The className of tabPane
   */
  tabPaneClass?: string;
  /**
   * The size of tab
   */
  size?: TabSizeType;
  /**
   * Custom content of tabPane
   */
  children?: ReactNode | undefined;
  /**
   * Function that recieved activeTabItem and render content of tabPane
   */
  renderTabPaneContent?: (tabItem: TabItemType) => ReactNode;
  /**
   * Callback executed when tab is clicked
   */
  onChange?: (tabKey: Key) => void;
}

export default function Tabs(props: TabsProps) {
  const {
    tabs,
    defaultActiveKey,
    tabsClass,
    tabBarClass: customTabBarClass,
    tabClass: customTabClass,
    tabPaneClass,
    size = "default",
    children,
    renderTabPaneContent,
    onChange,
  } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0].key);
  const activeTabItem = tabs.find((tab) => tab.key === activeKey)!;
  const isLageSize = size === "large";

  const tabsWrapperClass = cn("flex flex-col", tabsClass);

  const tabBarClass = cn(
    "flex bg-[#292A2D]",
    isLageSize ? "gap-[40px]" : "gap-[14px] px-3",
    customTabBarClass
  );

  const tabClass = cn(isLageSize ? "px-3" : "px-0", customTabClass);

  function handleChangeActiveTab(nextTabkey: Key) {
    if (nextTabkey === activeKey) return;
    setActiveKey(nextTabkey);
    onChange && onChange(nextTabkey);
  }

  return (
    <div className={tabsWrapperClass}>
      <div className={tabBarClass} role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            tabKey={tab.key}
            className={tabClass}
            label={tab.label}
            active={activeKey === tab.key}
            onTabClick={handleChangeActiveTab}
          />
        ))}
      </div>
      <div
        className={tabPaneClass}
        role="tabpanel"
        aria-labelledby={`${activeTabItem.label}`}
      >
        {renderTabPaneContent && renderTabPaneContent(activeTabItem)}
        {children}
      </div>
    </div>
  );
}
