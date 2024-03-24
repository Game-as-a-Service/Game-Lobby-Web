import type { Meta, StoryObj } from "@storybook/react";

import NavBar from "./index";

const meta: Meta<typeof NavBar> = {
  title: "Bars/NavBar",
  component: NavBar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type PlaygroudStory = StoryObj<typeof NavBar>;

export const Playgroud: PlaygroudStory = {
  render: (args) => <NavBar {...args}></NavBar>,
};

Playgroud.args = {};
