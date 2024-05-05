import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import IconV2 from ".";
import icons from "./icons";
import { keys } from "@/lib/utils";
import { Input } from "@/components/shared/Input";
import { ToastQueueProvider, useToast } from "@/components/shared/Toast";

const meta: Meta<typeof IconV2> = {
  title: "General/IconV2",
  component: IconV2,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastQueueProvider>
        <div className="relative flex flex-col items-center gap-5 bg-amber-50">
          <Story />
        </div>
      </ToastQueueProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IconV2>;

export const Playground: Story = {
  render: (args) => <IconV2 {...args} />,
};

Playground.args = {
  name: "arcade",
  className: "w-9 h-9",
};

const AllIcons = () => {
  const [value, setValue] = useState("");
  const toast = useToast();

  const handleClick = (iconName: string) => () => {
    const cb = navigator.clipboard;
    const text = `<IconV2 name="${iconName}" className="w-6 h-6" />`;

    toast({ children: "已複製成功!!" }, { duration: 1000 });

    cb.writeText(text).then();
  };

  return (
    <>
      <p className="absolute top-[-1.25rem] right-0 text-white/90">
        點擊 icon 即可複製
      </p>
      <Input
        label="搜尋"
        value={value}
        onChange={setValue}
        labelClassName="mr-3 leading-normal"
        inputClassName="border-white/90"
      />
      <div
        className="px-6 w-full h-96 grid place-content-start gap-10 overflow-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))" }}
      >
        {keys(icons)
          .filter((iconName) => iconName.includes(value))
          .map((iconName) => (
            <div
              key={iconName}
              className="cursor-pointer"
              onClick={handleClick(iconName)}
            >
              <IconV2 name={iconName} className="w-full h-full" />
              <p className="text-center text-white/90 whitespace-nowrap">
                {iconName}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export const All: Story = {
  render: () => <AllIcons />,
};
