import { Meta, StoryObj } from "@storybook/react";
import Badge from ".";

const meta: Meta = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center gap-10 items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  args: {
    placement: "top-right",
  },
  argTypes: {
    children: { control: { disable: true } },
    count: { control: { disable: true } },
  },
  render: (args) => {
    return (
      <>
        <div className="flex justify-center gap-10 items-center">
          <Badge count={0} showZero={false} {...args}>
            <div className="h-20 w-20 rounded-sm bg-gray-300"></div>
          </Badge>
          <Badge count={10} dot {...args}>
            <div className="h-20 w-20 rounded-sm bg-gray-300"></div>
          </Badge>
          <Badge count={10} {...args}>
            <div className="h-20 w-20 rounded-sm bg-gray-300"></div>
          </Badge>
          <Badge count={110} {...args}>
            <div className="h-20 w-20 rounded-sm bg-gray-300"></div>
          </Badge>
          <Badge count={99999} overflowCount={100000} {...args}>
            <div className="h-20 w-20 rounded-sm bg-gray-300"></div>
          </Badge>
        </div>
      </>
    );
  },
};
