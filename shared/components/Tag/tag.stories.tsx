import type { Meta, StoryObj } from "@storybook/react"

import Tag, { TagColor } from "."

const meta: Meta<typeof Tag> = {
  title: "Data Display/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "select",
        options: [TagColor.INDIGO, TagColor.GREEN, TagColor.RED],
      },
    },
    children: {
      control: {
        type: "text",
      },
    },
  },
}

export default meta

type PlaygroudStory = StoryObj<typeof Tag>

export const Playgroud: PlaygroudStory = {
  render: (args) => <Tag {...args}>{args.children}</Tag>,
}

Playgroud.args = {
  color: TagColor.INDIGO,
  children: "Tag",
}
