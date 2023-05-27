import type { Meta, StoryObj } from "@storybook/react";
import Tabs, { TabsProps } from ".";

const meta: Meta<typeof Tabs> = {
  title: "General/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<TabsProps>;

export const Lobby: Story = {
  args: {
    tabs: [
      { key: 0, label: "熱門遊戲" },
      { key: 1, label: "最新遊戲" },
      { key: 2, label: "好評遊戲" },
    ],
    defaultActiveKey: 2,
    size: "large",
    renderTabPaneContent: (tabItem) => (
      <div>This is {tabItem.label} TabPane.</div>
    ),
    children: <div>This is children prop.</div>,
  },
};

export const ChatRoom: Story = {
  args: {
    tabs: [
      { key: 0, label: "公開聊天" },
      { key: 1, label: "遊戲隊聊" },
      { key: 2, label: "好友聊天" },
    ],
    defaultActiveKey: 0,
    size: "default",
    renderTabPaneContent: (tabItem) => (
      <div>This is {tabItem.label} chat room.</div>
    ),
    children: <div>This is children prop.</div>,
  },
};
