import type { Meta, StoryObj } from "@storybook/react";

import InputOTP from ".";

const meta: Meta = {
  title: "Data Entry/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      return (
        <div className="flex justify-center">
          <Story />
        </div>
      );
    },
  ],
  args: {
    value: "",
    length: 4,
  },
};

export default meta;

type Story = StoryObj<typeof InputOTP>;

export const Playground: Story = {
  render: (args) => <InputOTP {...args} />,
};
