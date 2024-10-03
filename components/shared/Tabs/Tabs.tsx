import { useState, Key, ReactNode } from "react";
import Tab, { TabProps } from "./Tab";

export type TabItemType<T extends Key = string> = TabProps<T>;

export interface TabsProps<T extends Key = string> {
  /**
   * The array of tabItem to render tabBar
   */
  tabs: TabItemType<T>[];
  /**
   * Initial active tab's key
   */
  defaultActiveKey?: T;
  /**
   * Function that recieved activeTabItem and render content of tabPane
   */
  renderTabPaneContent?: (tabItem: TabItemType<T>) => ReactNode;
}

export default function Tabs<T extends Key = string>({
  tabs,
  defaultActiveKey,
  renderTabPaneContent,
}: Readonly<TabsProps<T>>) {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey ?? tabs[0]?.tabKey
  );
  const activeTabItem = tabs.find((tab) => tab.tabKey === activeKey);

  const handleChangeActiveTab = (nextTabKey: T) => {
    if (nextTabKey === activeKey) return;
    setActiveKey(nextTabKey);
  };

  return (
    <>
      <div role="tablist">
        {tabs.map((tab) => (
          <Tab
            key={tab.tabKey}
            tabKey={tab.tabKey}
            label={tab.label}
            isActive={activeKey === tab.tabKey}
            onClick={handleChangeActiveTab}
          />
        ))}
      </div>
      <div role="tabpanel" aria-labelledby={`${activeTabItem?.label}`}>
        {activeTabItem && renderTabPaneContent?.(activeTabItem)}
      </div>
    </>
  );
}
