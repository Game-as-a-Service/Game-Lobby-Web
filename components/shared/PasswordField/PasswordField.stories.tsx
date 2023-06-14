import { Meta, StoryObj } from "@storybook/react";
import PasswordField from "./index";
import { useState } from "react";

const meta: Meta = {
  title: "Room/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  argTypes: {
    children: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="flex justify-center gap-10 items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PasswordField>;

export const Playground: Story = {
  args: {
    active: true,
    title: "私人房間",
    subTitle: "請輸入房間密碼",
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [passwordValues, setPasswordValues] = useState(["", "", "", ""]);
    return (
      <>
        <div className="bg-[#353a41] justify-center items-center p-5 rounded-md">
          <div className="block w-[200px] h-[133px] rounded-[10px] border border-[#1E1F22] pt-[14px] px-6 text-center text-base cursor-pointer">
            <PasswordField
              title={args.title}
              subTitle={args.subTitle}
              active={args.active}
              passwordValues={passwordValues}
              setPasswordValues={setPasswordValues}
            />
          </div>
        </div>
      </>
    );
  },
};
