import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonSize, ButtonVariant } from "./Button";
import { ReactNode } from "react";
import Icon from "../../Icon";

const buttonVariantOptions: (ButtonVariant | undefined)[] = [
  undefined,
  ButtonVariant.PRIMARY,
  ButtonVariant.SECONDARY,
  ButtonVariant.HIGHLIGHT,
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
    className: {
      control: { type: "text" },
      description: "custom class name",
      defaultValue: "",
    },
    disabled: {
      control: { type: "boolean" },
    },
    style: {
      control: { type: "object" },
      description: "custom style",
      defaultValue: {},
    },
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
      {buttonVariantOptions.map((variant) => (
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
