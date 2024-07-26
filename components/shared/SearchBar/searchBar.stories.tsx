import type { Meta, StoryObj } from "@storybook/react";

import SearchBar from ".";

const meta: Meta<typeof SearchBar> = {
  title: "Data Entry/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  decorators: [
    (Story, ctx) => {
      const onSubmit = (value: string) => {
        ctx.args.onSubmit?.(value);
      };

      return (
        <div className="flex justify-center">
          <div className="max-w-[546px] w-full">
            <Story args={{ ...ctx.args, onSubmit }} />
          </div>
        </div>
      );
    },
  ],
  argTypes: {
    onSubmit: {
      type: "function",
    },
    leftSlot: {
      control: { type: "select" },
      options: ["Empty", "Button"],
      defaultValue: "Button",
      mapping: {
        Empty: null,
        Button: (
          <button type="button" className="pl-5 pr-2.5 px-4 text-primary-300">
            類型
          </button>
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {
  render: (args) => <SearchBar {...args} />,
};
