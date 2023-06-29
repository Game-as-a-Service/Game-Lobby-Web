import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";
import Button from "../Button";
import { cn } from "@/lib/utils";

const buttonClass = "w-full rounded-none bg-dark1E hover:bg-blue2f";

const actions = (
  <>
    <Button className={cn("__create__room__", buttonClass)}>開設新房間</Button>
    <Button className={cn("__join__room__", buttonClass)}>加入現有房間</Button>
    <Button className={cn("__info__room__", buttonClass)}>遊戲詳情</Button>
  </>
);

const meta: Meta<typeof Card> = {
  title: "Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  args: {
    game: {
      id: "1",
      imgUrl:
        "https://plus.unsplash.com/premium_photo-1668473365948-8a92c2d1fa78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
      name: "矮人礦坑(Mystic Elven Mines)",
      price: 100,
      rating: 4.5,
      category: ["益智", "戰略", "多人"],
    },
    actions,
  },
  argTypes: {
    className: {
      control: { type: "text" },
    },
    style: {
      control: { type: "text" },
    },
    game: {
      control: { type: "object" },
      category: {
        control: { type: "array" },
      },
    },
    actions: {
      control: { type: "object" },
      props: {
        children: {
          control: { type: "array" },
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: (args) => <Card className="w-[300px]" {...args} />,
};
