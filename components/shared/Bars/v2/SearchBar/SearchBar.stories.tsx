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
  render: (args) => (
    <div className={"h-[800px]"}>
      <SearchBar {...args}></SearchBar>
      <div className={"text-white p-6"}>Other Item</div>
    </div>
  ),
};

Playgroud.args = {
  onSearchText: (text: string) => {
    alert(`searchText: ${text}`);
  },
  onSearchType: (text: string) => {
    alert(`onSearchType: ${text}`);
  },
};
