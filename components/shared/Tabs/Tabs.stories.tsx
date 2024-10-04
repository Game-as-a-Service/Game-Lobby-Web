import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { TabsProps, TabItemType } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TabsProps<number>>;

export const Playground: Story = {
  args: {
    tabs: [
      { tabKey: 0, label: "熱門遊戲" },
      { tabKey: 1, label: "最新遊戲" },
      { tabKey: 2, label: "好評遊戲" },
    ],
    defaultActiveKey: 2,
    renderTabPaneContent: (tabItem) => (
      <div className="p-4 text-primary-200">
        This is {tabItem.label} TabPane.
      </div>
    ),
  },
};
