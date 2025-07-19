import type { Meta, StoryObj } from "@storybook/react";
import Button, { ButtonSize, ButtonVariant } from "./Button";

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

const meta: Meta<typeof Button> = {
  title: "general/Button",
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
