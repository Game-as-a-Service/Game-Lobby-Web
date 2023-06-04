import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb, { BreadcrumbProps } from "./Breadcrumb";

const meta: Meta<BreadcrumbProps> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    separator: ">",
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Playground: Story = {
  args: {
    separator: ">",
    children: (
      <Breadcrumb className="text-white">
        <Breadcrumb.Item text="Lobby" href="/lobby" />
        <Breadcrumb.Item text="MMORPG" href="/lobby/mmorpg" />
        <Breadcrumb.Item text="Waiting" href="/lobby/mmorpg/waiting" />
      </Breadcrumb>
    ),
  },
};
