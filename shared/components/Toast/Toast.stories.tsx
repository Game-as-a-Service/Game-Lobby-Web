import type { Meta, StoryObj } from "@storybook/react";

import Toast from "@/shared/components/Toast";

const meta: Meta<typeof Toast> = {
  title: "feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-[11px]">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "TOAST YOU",
  },
  argTypes: {
    state: {
      control: { type: "select" },
      options: [undefined, "default", "success", "warning", "error", "info"],
    },
    size: {
      control: { type: "select" },
      options: [undefined, "sm", "md", "lg"],
    },
    length: {
      control: { type: "select" },
      options: [undefined, "auto", "sm", "md", "lg"],
    },
    rounded: {
      control: { type: "select" },
      options: [undefined, "none", "sm", "md", "lg", "full"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: (args) => <Toast {...args}>{args.children}</Toast>,
};

export const State: Story = {
  render: (args) => (
    <>
      <Toast state="success" {...args}>
        {args.children}
      </Toast>
      <Toast state="warning" {...args}>
        {args.children}
      </Toast>
      <Toast state="error" {...args}>
        {args.children}
      </Toast>
      <Toast state="info" {...args}>
        {args.children}
      </Toast>
    </>
  ),
};

export const Size: Story = {
  render: (args) => (
    <>
      <Toast size="sm" {...args}>
        {args.children}
      </Toast>
      <Toast size="md" {...args}>
        {args.children}
      </Toast>
      <Toast size="lg" {...args}>
        {args.children}
      </Toast>
    </>
  ),
};

export const Length: Story = {
  render: (args) => (
    <>
      <Toast length="auto" {...args}>
        {args.children}
      </Toast>
      <Toast length="sm" {...args}>
        {args.children}
      </Toast>
      <Toast length="md" {...args}>
        {args.children}
      </Toast>
      <Toast length="lg" {...args}>
        {args.children}
      </Toast>
    </>
  ),
};

export const Rounded: Story = {
  render: (args) => (
    <>
      <Toast rounded="none" {...args}>
        {args.children}
      </Toast>
      <Toast rounded="sm" {...args}>
        {args.children}
      </Toast>
      <Toast rounded="md" {...args}>
        {args.children}
      </Toast>
      <Toast rounded="lg" {...args}>
        {args.children}
      </Toast>
      <Toast rounded="full" {...args}>
        {args.children}
      </Toast>
    </>
  ),
};
