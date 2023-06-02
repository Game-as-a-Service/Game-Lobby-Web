import type { Meta, StoryObj } from "@storybook/react";
import {
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_MANUAL_CLOSE_PLAN,
  DEFAULT_TOAST_POSITION,
  Toaster,
  useToast,
  UseToastComponent,
  UseToastOptions,
} from "@/shared/components/Toast";
import Toast from "@/shared/components/Toast";
import type { ToastProps } from "@/shared/components/Toast";
import { ToastQueueProvider } from "@/shared/components/Toast";
import { FC, useEffect, useRef, useState } from "react";
import { Button, ButtonVariant } from "@/shared/components/Button";
import { toastStoryArgTypes } from "@/shared/components/Toast/toastStoryArgTypes";

interface DemoUseToastProps
  extends ToastProps,
    Omit<UseToastOptions, "targetEl"> {}

const DemoUseToast: FC<DemoUseToastProps> = ({
  state,
  size,
  length,
  rounded,
  duration,
  position,
  manualClosePlan,
}) => {
  const toast = useToast();
  const rightDivRef = useRef<HTMLDivElement>(null);
  const [rightDivElement, setRightDivElement] = useState<HTMLElement | null>(
    null
  );

  // update rightDivElement after the component is mounted
  useEffect(() => {
    setRightDivElement(rightDivRef.current);
  }, []);

  const myComponent: UseToastComponent = {
    state,
    size,
    length,
    rounded,
  };

  const myOptions: UseToastOptions = {
    duration,
    position,
    manualClosePlan,
  };

  const toastArgs: Record<"left" | "right", Parameters<Toaster>> = {
    left: [
      {
        children: "GG EZ",
        ...myComponent,
      },
      myOptions,
    ],
    right: [
      <Toast key={Math.random()} {...myComponent}>
        LOUDER
      </Toast>,
      {
        ...myOptions,
        targetEl: rightDivElement,
      },
    ],
  };

  const handleButtonClick = (prop: keyof typeof toastArgs) => () => {
    const args: Parameters<Toaster> = toastArgs[prop];
    toast(...args);
  };

  return (
    <div className={"w-full h-[400px] grid grid-cols-2"}>
      <div className={"flex justify-center items-center"}>
        <Button onClick={handleButtonClick("left")}>
          What do we say when we win something?
        </Button>
      </div>
      <div ref={rightDivRef} className={"relative bg-yellow-100 p-4"}>
        <Button
          variant={ButtonVariant.DARK}
          onClick={handleButtonClick("right")}
        >
          yay
        </Button>
      </div>
    </div>
  );
};

const meta: Meta<typeof DemoUseToast> = {
  title: "feedback/useToast",
  component: DemoUseToast,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastQueueProvider>
        <Story />
      </ToastQueueProvider>
    ),
  ],
  argTypes: {
    ...toastStoryArgTypes,
    duration: {
      control: { type: "number" },
      defaultValue: DEFAULT_TOAST_DURATION,
    },
    position: {
      control: { type: "select" },
      options: [
        "top",
        "top-left",
        "top-right",
        "bottom",
        "bottom-left",
        "bottom-right",
      ],
      defaultValue: DEFAULT_TOAST_POSITION,
    },
    manualClosePlan: {
      control: { type: "select" },
      options: ["fullBody", "closeButton", "none"],
      defaultValue: DEFAULT_TOAST_MANUAL_CLOSE_PLAN,
    },
  },
};

export default meta;

type Story = StoryObj<typeof DemoUseToast>;

export const Playground: Story = {
  render: (args) => <DemoUseToast {...args} />,
};
