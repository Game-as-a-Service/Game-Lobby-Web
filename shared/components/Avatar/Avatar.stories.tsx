import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Avatar from "./index";
import profileImg from "@/public/images/profile.jpg";

const meta: Meta = {
  title: "Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    src: { control: { disable: true } },
    onClick: { control: { disable: true, action: "onClick" } },
    type: { control: { disable: true } },
    href: { control: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="flex gap-2 items-center w-fit">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: profileImg,
    type: "button",
    isOnline: true,
    onClick: action("onClick"),
  },
};

const AvatarStoryTemplate: Story = {
  render: (args) => {
    return (
      <>
        <Avatar {...args} size="small" />
        <Avatar {...args} size="default" shape="square" />
        <Avatar {...args} size="large" isOnline />
        <Avatar {...args} size="large" isOnline src="/images/invalid.png" />
      </>
    );
  },
};

export const AvatarAsButton: Story = {
  ...AvatarStoryTemplate,
  args: { type: "button", src: profileImg, onClick: action("onClick") },
};

export const AvatarAsLink: Story = {
  ...AvatarStoryTemplate,
  args: {
    type: "link",
    src: profileImg,
    href: "https://www.google.com/",
  },
};

export const AvatarAsImage: Story = {
  ...AvatarStoryTemplate,
  args: { type: "image", src: profileImg },
};
