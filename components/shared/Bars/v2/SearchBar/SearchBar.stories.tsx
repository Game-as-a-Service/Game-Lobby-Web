import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from "./index";

const meta: Meta<typeof SearchBar> = {
  title: "Bars/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;

type PlaygroudStory = StoryObj<typeof SearchBar>;

export const Playgroud: PlaygroudStory = {
  render: (args) => <SearchBar {...args}></SearchBar>,
};

Playgroud.args = {};
