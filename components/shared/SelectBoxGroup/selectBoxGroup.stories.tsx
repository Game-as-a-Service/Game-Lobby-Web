import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import SelectBoxGroup from ".";

const meta: Meta<typeof SelectBoxGroup<string>> = {
  title: "Data Entry/SelectBoxGroup",
  component: SelectBoxGroup,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      const onChange = (value: string) => {
        ctx.args.onChange?.(value);
        setArgs({ value });
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
    value: "option1",
    items: [
      {
        key: 1,
        label: <div className="px-2 py-1">Option 1</div>,
        value: "option1",
      },
      {
        key: 2,
        label: <div className="px-2 py-1">Option 2</div>,
        value: "option2",
      },
    ],
  },
  argTypes: {
    onChange: {
      type: "function",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectBoxGroup>;

export const Playground: Story = {
  render: (args) => <SelectBoxGroup {...args} />,
};
