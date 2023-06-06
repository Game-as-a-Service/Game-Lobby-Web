import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import Input, { ChangeHandler } from ".";

const meta: Meta<typeof Input> = {
  title: "Data Entry/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      const onChange: ChangeHandler = (value, event) => {
        ctx.args.onChange?.(value, event);

        // Check if the component is controlled
        if (typeof ctx.args.value !== undefined) {
          setArgs({ value });
        }
      };

      return (
        <div className="flex justify-center">
          <div className="w-3/4">
            <Story args={{ ...ctx.args, onChange }} />
          </div>
        </div>
      );
    },
  ],
  args: {
    label: "Label Name",
  },
  argTypes: {
    prefix: {
      type: "string",
    },
    suffix: {
      type: "string",
    },
    maxLength: {
      type: "number",
    },
    errorMessage: {
      type: "string",
    },
    onChange: {
      type: "function",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  render: (args) => <Input {...args} />,
};

Disabled.args = {
  disabled: true,
};

export const ReadOnly: Story = {
  render: (args) => <Input {...args} />,
};

ReadOnly.args = {
  readOnly: true,
};

export const ErrorAndMessage: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} />
      <Input errorMessage="message is error" {...args} />
      <Input errorMessage={["message-1", "message-2"]} {...args} />
    </div>
  ),
};

ErrorAndMessage.args = {
  error: true,
};

export const MaxLength: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} />
      <Input value="測試" {...args} />
      <Input value="測試輸入七個字" {...args} />
    </div>
  ),
};

MaxLength.args = {
  maxLength: 5,
};

export const PrefixAndSuffix: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input prefix="🎉" inputClassName="ml-0.5 mr-8" {...args} />
      <Input suffix="🎵" inputClassName="mr-0.5 ml-8" {...args} />
    </div>
  ),
};
