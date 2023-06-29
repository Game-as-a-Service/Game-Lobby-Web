import type { Meta, StoryObj } from "@storybook/react";

import Portal from "./index";

const meta: Meta<typeof Portal> = {
  title: "GENERAL/Portal",
  component: Portal,
  tags: ["autodocs"],
  argTypes: {
    children: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="bg-white h-20">
        <span className="text-gray-500"> The container wrapping portal.</span>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Portal>;

export const Playground: Story = {
  args: {
    rootId: "custom-id",
  },
  render: (args) => (
    <Portal rootId={args.rootId}>
      <div className="bg-blue">Portal is here!</div>
    </Portal>
  ),
};
