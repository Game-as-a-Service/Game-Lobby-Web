import type { Meta, StoryObj } from "@storybook/react";

import Button, { ButtonVariant } from ".";

const LoadingIcon1 = () => (
  <div className="border-2 border-t-white/30 w-4 h-4 rounded-full animate-spin"></div>
);

const LoadingIcon2 = () => (
  <div className="inline-flex gap-1 translate-y-0.5">
    <div className="w-1 h-3 bg-white/80 rounded-full animate-[bounce_0.9s_0s_infinite]"></div>
    <div className="w-1 h-3 bg-white/80 rounded-full animate-[bounce_0.9s_0.3s_infinite]"></div>
    <div className="w-1 h-3 bg-white/80 rounded-full animate-[bounce_0.9s_0.6s_infinite]"></div>
  </div>
);

const meta: Meta<typeof Button> = {
  title: "General/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "BUTTON",
  },
  argTypes: {
    component: {
      control: { type: "select" },
      options: ["button", "a"],
    },
    variant: {
      options: [
        undefined,
        ButtonVariant.PRIMARY,
        ButtonVariant.SECONDARY,
        ButtonVariant.DANGER,
        ButtonVariant.DARK,
      ],
    },
    loadingComponent: {
      control: { type: "select" },
      options: ["LoadingIcon1", "LoadingIcon2"],
      mapping: {
        LoadingIcon1: <LoadingIcon1 />,
        LoadingIcon2: <LoadingIcon2 />,
      },
    },
    prefix: {
      type: "string",
    },
    suffix: {
      type: "string",
    },
    onClick: {
      type: "function",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  render: (args) => <Button {...args}>{args.children}</Button>,
};

export const Variant: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="primary" {...args}>
        {args.children}
      </Button>
      <Button variant="secondary" {...args}>
        {args.children}
      </Button>
      <Button variant="danger" {...args}>
        {args.children}
      </Button>
      <Button variant="dark" {...args}>
        {args.children}
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="primary" disabled {...args}>
        {args.children}
      </Button>
      <Button variant="secondary" disabled {...args}>
        {args.children}
      </Button>
      <Button variant="danger" disabled {...args}>
        {args.children}
      </Button>
      <Button variant="dark" disabled {...args}>
        {args.children}
      </Button>
    </div>
  ),
};

export const Active: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button variant="primary" active {...args}>
        {args.children}
      </Button>
      <Button variant="secondary" active {...args}>
        {args.children}
      </Button>
      <Button variant="danger" active {...args}>
        {args.children}
      </Button>
      <Button variant="dark" active {...args}>
        {args.children}
      </Button>
    </div>
  ),
};

export const LoadingAndComponent: Story = {
  render: (args) => (
    <div>
      <div className="mb-2 flex gap-2">
        <Button variant="primary" loading {...args}>
          {args.children}
        </Button>
        <Button variant="secondary" loading {...args}>
          {args.children}
        </Button>
        <Button variant="danger" loading {...args}>
          {args.children}
        </Button>
        <Button variant="dark" loading {...args}>
          {args.children}
        </Button>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          loading
          loadingComponent={<LoadingIcon2 />}
          {...args}
        >
          {args.children}
        </Button>
        <Button
          variant="secondary"
          loading
          loadingComponent={<LoadingIcon2 />}
          {...args}
        >
          {args.children}
        </Button>
        <Button
          variant="danger"
          loading
          loadingComponent={<LoadingIcon2 />}
          {...args}
        >
          {args.children}
        </Button>
        <Button
          variant="dark"
          loading
          loadingComponent={<LoadingIcon2 />}
          {...args}
        >
          {args.children}
        </Button>
      </div>
    </div>
  ),
};

export const PrefixAndSuffix: Story = {
  render: (args) => (
    <div className="flex gap-2">
      <Button prefix="🎉" {...args}>
        {args.children}
      </Button>
      <Button prefix="🎉" loading {...args}>
        {args.children}
      </Button>
      <Button suffix="🎵" {...args}>
        {args.children}
      </Button>
      <Button suffix="🎵" loading {...args}>
        {args.children}
      </Button>
    </div>
  ),
};
