import React from "react";
import TabItem from "./TabItem";

type Props = {
  tabList: string[];
};

const TabBar = ({ tabList }: Readonly<Props>) => {
  const [currentTab, setCurrentTab] = React.useState(tabList[0]);
  const handleClick = (text: string) => {
    setCurrentTab(text);
    console.log(currentTab);
  };

  return (
    <div>
      {tabList.map((value, index) => {
        return (
          <TabItem
            key={index}
            text={value}
            active={value === currentTab}
            onTabClick={handleClick}
          ></TabItem>
        );
      })}
    </div>
  );
};

export default TabBar;
