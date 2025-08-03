import { useEffect } from "react";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import Carousel from "./Carousel";
import type { TItem } from "./Carousel.type";

type CardProps = { name: string } & TItem;

const Card = (props: CardProps) => (
  <div className="text-white mx-12 px-12 py-8 border border-white rounded-md text-8xl font-mono">
    {props.name}
  </div>
);

const meta: Meta<typeof Carousel<CardProps>> = {
  title: "Data Display/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      useEffect(() => {
        const handleResize = () => {
          setArgs({});
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
      }, [setArgs]);

      return (
        <div className="flex justify-center">
          <Story {...ctx} />
        </div>
      );
    },
  ],
  args: {
    items: [
      { id: 1, name: "TEST 1" },
      { id: 2, name: "TEST 2" },
      { id: 3, name: "TEST 3" },
    ],
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
