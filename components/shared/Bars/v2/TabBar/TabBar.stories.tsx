import type { Meta, StoryObj } from "@storybook/react";

import TabBar from "./index";

const meta: Meta<typeof TabBar> = {
  title: "Bars/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type PlaygroudStory = StoryObj<typeof TabBar>;

export const Playgroud: PlaygroudStory = {
  render: (args) => <TabBar {...args}></TabBar>,
};

Playgroud.args = {
  tabList: ["熱門遊戲", "最新遊戲", "上次遊玩", "好評遊戲", "收藏遊戲"],
};
