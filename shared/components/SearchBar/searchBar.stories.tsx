import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

import type { ChangeHandler } from "../Input";
import SearchBar from ".";

const meta: Meta<typeof SearchBar> = {
  title: "Data Entry/SearchBar",
  component: SearchBar,
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
          <div className="max-w-[546px] w-full">
            <Story args={{ ...ctx.args, onChange }} />
          </div>
        </div>
      );
    },
  ],
  argTypes: {
    onChange: {
      type: "function",
    },
    onSubmit: {
      type: "function",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {
  render: (args) => <SearchBar {...args} />,
};
