import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize, ButtonType } from "./Button";
import { ReactNode } from "react";
import Icon from "../../Icon";

const buttonTypeOptions: (ButtonType | undefined)[] = [
  undefined,
  ButtonType.PRIMARY,
  ButtonType.SECONDARY,
  ButtonType.HIGHLIGHT,
];

const buttonSizeOptions: (ButtonSize | undefined)[] = [
  undefined,
  ButtonSize.REGULAR,
  ButtonSize.SMALL,
];
const buttonIconOptions: ReactNode = [
  null,
  <Icon key="1" name="gamepad" className="w-6 h-6 stroke-black" />,
];

const meta: Meta<typeof Button> = {
  title: "general/ButtonV2",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center gap-[11px]">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Button",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: buttonTypeOptions,
    },
    size: {
      control: { type: "select" },
      options: buttonSizeOptions,
    },
    icon: {
      control: { type: "select" },
      options: buttonIconOptions,
    },
    className: {
      control: { type: "text" },
      description: "custom class name",
      defaultValue: "",
    },
    style: {
      control: { type: "object" },
      description: "custom style",
      defaultValue: {},
    },
    ref: { control: { disable: true } },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  render: (args) => <Button {...args} />,
};

export const Type: Story = {
  render: (args) => (
    <>
      {buttonTypeOptions.map((type) => (
        <Button key={type} type={type} {...args}>
          {args.children}
        </Button>
      ))}
    </>
  ),
};
export const Size: Story = {
  render: (args) => (
    <>
      {buttonSizeOptions.map((size) => (
        <Button key={size} size={size} {...args}>
          {args.children}
        </Button>
      ))}
    </>
  ),
};
