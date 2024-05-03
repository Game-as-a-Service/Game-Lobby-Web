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

const buttonIconNameOptions: (string | undefined)[] = [undefined, "arcade"];

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
    component: {
      control: { type: "select" },
      options: ["button", "a"],
    },
    variant: {
      control: { type: "select" },
      options: buttonTypeOptions,
    },
    size: {
      control: { type: "select" },
      options: buttonSizeOptions,
    },
    iconName: {
      control: { type: "select" },
      options: buttonIconNameOptions,
      description:
        "Icon name from `IconV2` component. If `icon` is not `undefinded`, this prop will be ignored.",
    },
    icon: {
      control: { type: "select" },
      options: buttonIconOptions,
      description:
        "Custom icons or any prefix component. If `iconName` is not `undefinded`, this prop will be ignored.",
    },
    boxFancyClassName: {
      control: { type: "text" },
      description: "custom class name for inner div",
      defaultValue: "",
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

export const Variant: Story = {
  render: (args) => (
    <>
      {buttonTypeOptions.map((variant) => (
        <Button key={variant} variant={variant} {...args}>
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
