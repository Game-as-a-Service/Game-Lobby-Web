import { Meta, StoryObj } from "@storybook/react";
import Chat from "./Chat";
import {
  mockFriendList,
  mockLobbyMessages,
  mockRoomMessages,
} from "./__mocks__/mock";

const meta: Meta = {
  title: "Room/Chat",
  component: Chat,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="flex justify-center gap-10 items-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const Playground: Story = {
  args: {},
  render: (args) => {
    return <Chat {...args} />;
  },
};

Playground.args = {
  friendList: mockFriendList,
  lobbyMessages: mockLobbyMessages,
  roomMessages: mockRoomMessages,
};
