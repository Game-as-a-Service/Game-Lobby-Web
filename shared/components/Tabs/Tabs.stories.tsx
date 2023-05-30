import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { TabsProps } from ".";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TabsProps>;

export const Playground: Story = {
  args: {
    tabs: [
      { key: 0, label: "熱門遊戲" },
      { key: 1, label: "最新遊戲" },
      { key: 2, label: "好評遊戲" },
    ],
    defaultActiveKey: 2,
    size: "default",
    renderTabPaneContent: (tabItem) => (
      <div>This is {tabItem.label} TabPane.</div>
    ),
    children: <div>This is children prop.</div>,
  },
};

export const Size: Story = {
  args: {
    tabs: [
      { key: 0, label: "公開聊天" },
      { key: 1, label: "遊戲隊聊" },
      { key: 2, label: "好友聊天" },
    ],
    defaultActiveKey: 0,
    size: "default",
  },
  render: () => (
    <div className="flex flex-col gap-5">
      <Tabs
        tabs={[
          { key: 0, label: "公開聊天" },
          { key: 1, label: "遊戲隊聊" },
          { key: 2, label: "好友聊天" },
        ]}
        size="default"
      />
      <Tabs
        tabs={[
          { key: 0, label: "公開聊天" },
          { key: 1, label: "遊戲隊聊" },
          { key: 2, label: "好友聊天" },
        ]}
        size="large"
      />
    </div>
  ),
};
