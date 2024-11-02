import type { Meta, StoryObj } from "@storybook/react";
import Cover from "./index";

const meta: Meta<typeof Cover> = {
  title: "Data Display/ Cover",
  component: Cover,
  tags: ["autodocs"],
  args: {
    src: "https://images.unsplash.com/photo-1684006231760-3f0290bf42a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80",
    alt: "Cover",
    width: 100,
    height: 130,
  },
  argTypes: {
    src: {
      type: "string",
    },
    alt: {
      type: "string",
    },
  },
};

type Story = StoryObj<typeof Cover>;

export const Playground: Story = {
  render: (args) => <Cover {...args} />,
};

export const DefaultErrorCover: Story = {
  render: (args) => <Cover {...args} />,
};

DefaultErrorCover.args = {
  src: "error src",
};

export default meta;
