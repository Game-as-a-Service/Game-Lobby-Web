import type { Meta, StoryObj } from "@storybook/react";
import { MouseEventHandler, useState } from "react";

import { keys } from "@/lib/utils";
import { Input } from "@/components/shared/Input";
import { ToastQueueProvider, useToast } from "@/components/shared/Toast";
import * as icons from "./icons";
import Icon from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "General/Icon",
  component: Icon,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastQueueProvider>
        <div className="relative flex flex-col items-center gap-5">
          <Story />
        </div>
      </ToastQueueProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Playground: Story = {
  render: (args) => <Icon {...args} />,
};

Playground.args = {
  name: "Arcade",
  className: "w-9 h-9",
};

const AllIcons = () => {
  const [value, setValue] = useState("");
  const toast = useToast();

  const handleClick =
    (iconName: string): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.stopPropagation();

      const cb = navigator.clipboard;
      const text = `<Icon name="${iconName}" className="w-6 h-6" />`;

      toast({ children: "已複製成功!!" }, { duration: 1000 });

      cb.writeText(text).then();
    };

  return (
    <>
      <p className="absolute top-0 right-4">點擊 icon 即可複製</p>
      <Input
        label="搜尋"
        value={value}
        onChange={setValue}
        labelClassName="mr-3 leading-normal"
        inputClassName="border-white/90"
      />
      <div
        className="px-6 w-full h-96 grid place-content-start gap-4 overflow-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}
      >
        {keys(icons)
          .filter((iconName) => iconName.includes(value))
          .map((iconName) => (
            <button
              key={iconName}
              className="flex flex-col justify-center items-stretch cursor-pointer"
              onClick={handleClick(iconName)}
            >
              <Icon name={iconName} className="h-10" />
              <p className="text-center whitespace-nowrap">{iconName}</p>
            </button>
          ))}
      </div>
    </>
  );
};

export const All: Story = {
  render: () => <AllIcons />,
};
