import type { Meta, StoryObj } from "@storybook/react";

import MenuBar from "./index";

const meta: Meta<typeof MenuBar> = {
  title: "Bars/MenuBar",
  component: MenuBar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type PlaygroudStory = StoryObj<typeof MenuBar>;

export const Playgroud: PlaygroudStory = {
  render: (args) => <MenuBar {...args}></MenuBar>,
};

Playgroud.args = {};
