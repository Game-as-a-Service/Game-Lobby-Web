import type { Meta, StoryObj } from "@storybook/react";
import {
  DEFAULT_TOAST_DURATION,
  DEFAULT_TOAST_MANUAL_CLOSE_PLAN,
  DEFAULT_TOAST_POSITION,
  Toaster,
  useToast,
  UseToastComponent,
  UseToastOptions,
} from "@/components/shared/Toast/index";
import Toast from "@/components/shared/Toast/index";
import type { ToastProps } from "@/components/shared/Toast/index";
import { ToastQueueProvider } from "@/components/shared/Toast/index";
import { FC, useEffect, useRef, useState } from "react";
import { Button, ButtonVariant } from "@/components/shared/Button";
import { toastStoryArgTypes } from "@/components/shared/Toast/toastStoryArgTypes";

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
      description:
        "In milliseconds. If value is negative, NaN, greater than 600000 (10 minutes) will be considered as non-automatic closing",
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
      description: "render position",
      defaultValue: DEFAULT_TOAST_POSITION,
    },
    manualClosePlan: {
      control: { type: "select" },
      options: ["fullBody", "closeButton", "none"],
      description:
        "How to close the toast manually. If 'none' and duration is set to non-automatic closing will force to be default to 'fullBody'",
      defaultValue: DEFAULT_TOAST_MANUAL_CLOSE_PLAN,
    },
  },
};

export default meta;

type Story = StoryObj<typeof DemoUseToast>;

export const Playground: Story = {
  render: (args) => <DemoUseToast {...args} />,
};
