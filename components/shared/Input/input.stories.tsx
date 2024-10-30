import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import Input, { ChangeHandler } from ".";
import Icon from "../Icon";

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
    value: "value",
    hintText: "Hint Text",
    placeholder: "Placeholder",
  },
  argTypes: {
    maxLength: {
      type: "number",
    },
    hintText: {
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

export const HintAndError: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} />
    </div>
  ),
};

HintAndError.args = {
  error: true,
};

export const PrefixAndSuffix: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} />
    </div>
  ),
};

PrefixAndSuffix.args = {
  prefix: "🎉",
  suffix: <Icon name="Calendar" className="w-5 h-5" />,
};
