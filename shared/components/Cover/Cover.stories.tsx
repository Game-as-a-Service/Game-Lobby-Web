import type { Meta, StoryObj } from "@storybook/react";
import Cover from "./index";

const meta: Meta<typeof Cover> = {
  title: "Data Display/ Cover",
  component: Cover,
  decorators: [
    (Story) => (
      <div className="flex gap-2 items-center w-fit">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    src: "https://images.unsplash.com/photo-1684006231760-3f0290bf42a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80",
    alt: "Cover",
  },
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    fill: { control: "boolean" },
    className: { control: "text" },
  },
};

type Story = StoryObj<typeof Cover>;

export const Playgrond: Story = {
  render: (args) => {
    return <Cover {...args} />;
  },
};

export const CoverFill: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1682687219573-3fd75f982217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80",
    alt: "Cover2",
    fill: true,
    className: "w-[250px] h-[250px]",
  },
  render: (args) => {
    return <Cover {...args} />;
  },
};

export const CoverWithVewport: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1685350854473-3f7822f1633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    alt: "Cover1",
    width: 100,
    height: 100,
    className: "w-full sm:w-[100%] md:w-[320px] lg:w-[150px]",
  },
  render: (args) => {
    return <Cover {...args} />;
  },
};

export default meta;
