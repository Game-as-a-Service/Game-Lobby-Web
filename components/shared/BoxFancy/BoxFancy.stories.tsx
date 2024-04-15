import type { Meta, StoryObj } from "@storybook/react";
import BoxFancy, {
  BoxFancyBorderGradientVariant,
  BoxFancyBorderRadiusVariant,
  BoxFancyBorderSizeVariant,
} from "@/components/shared/BoxFancy/index";
import { toastStoryArgTypes } from "@/components/shared/Toast/toastStoryArgTypes";
import Toast from "@/components/shared/Toast";

const borderSizeOptions: (BoxFancyBorderSizeVariant | undefined)[] = [
  undefined,
  "none",
  "small",
  "medium",
  "large",
  "xLarge",
  "extraLarge",
];
const borderRadiusOptions: (BoxFancyBorderRadiusVariant | undefined)[] = [
  undefined,
  "none",
  "small",
  "medium",
  "large",
  "xLarge",
  "extraLarge",
  "full",
];
const borderGradientColorOptions: (
  | BoxFancyBorderGradientVariant
  | undefined
)[] = [undefined, "none", "purple", "black"];

const meta: Meta<typeof BoxFancy> = {
  title: "general/BoxFancy",
  component: BoxFancy,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex flex-col items-center gap-[11px]">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Love this border",
  },
  argTypes: {
    borderSize: {
      control: { type: "select" },
      options: borderSizeOptions,
    },
    borderRadius: {
      control: { type: "select" },
      options: borderRadiusOptions,
    },
    borderGradientColor: {
      control: { type: "select" },
      options: borderGradientColorOptions,
    },
    className: {
      control: { type: "text" },
      description:
        "custom class name, try mapped tailwindcss class name: 'bg-red-500'",
      defaultValue: "",
    },
    style: {
      control: { type: "object" },
      description: "custom style",
      defaultValue: {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof BoxFancy>;

export const Playground: Story = {
  render: (args) => <BoxFancy {...args} />,
};

export const BorderSize: Story = {
  render: (args) => (
    <>
      {borderSizeOptions.map((borderSize) => (
        <BoxFancy key={borderSize} borderSize={borderSize} {...args}>
          {args.children}
        </BoxFancy>
      ))}
    </>
  ),
};
export const BorderRadius: Story = {
  render: (args) => (
    <>
      {borderRadiusOptions.map((borderRadius) => (
        <BoxFancy key={borderRadius} borderRadius={borderRadius} {...args}>
          {args.children}
        </BoxFancy>
      ))}
    </>
  ),
};
export const BorderGradientColor: Story = {
  render: (args) => (
    <>
      {borderSizeOptions.map((borderGradientColor) => (
        <BoxFancy
          key={borderGradientColor}
          borderSize={borderGradientColor}
          {...args}
        >
          {args.children}
        </BoxFancy>
      ))}
    </>
  ),
};
