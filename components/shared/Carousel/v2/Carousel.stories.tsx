import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./";

const Card = (props: any) => (
  <div className="text-white mx-4 px-12 py-8 border border-white rounded-md text-8xl font-mono">
    {props.name}
  </div>
);

const meta: Meta<typeof Carousel> = {
  title: "Data Display/CarouselV2",
  component: Carousel,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      return (
        <div className="flex justify-center">
          <Story {...ctx} />
        </div>
      );
    },
  ],
  args: {
    uniqueKey: "name",
    items: [{ name: "TEST 1" }, { name: "TEST 2" }, { name: "TEST 3" }],
    Component: Card,
  },
  argTypes: {
    Component: {
      options: ["Card"],
      defaultValue: Card,
      mapping: {
        Card,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

export const Playground: Story = {
  render: (args) => <Carousel {...args} />,
};

Playground.args = {};
