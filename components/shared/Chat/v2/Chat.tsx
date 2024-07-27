import { CSSProperties, useEffect, useState } from "react";
import ChatHeader, { ChatTab } from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFriendList, { FriendType, getTargetUser } from "./ChatFriendList";
import ChatInput from "./ChatInput";
import type { MessageType } from "./ChatMessages";
import { createMockFriendMessages } from "./__mocks__/mock";
import Icon from "../../Icon";

export type ChatProps = {
  userId: string;
  lobbyMessages: MessageType[];
  friendList: FriendType[];
  roomMessages: MessageType[];
  maxHeight?: string;
};

export default function Chat({
  userId,
  lobbyMessages,
  friendList,
  roomMessages,
  maxHeight = "calc(100vh - 10rem)",
}: Readonly<ChatProps>) {
  const [messages, setMessages] = useState(lobbyMessages);
  const [target, setTarget] = useState<[ChatTab["id"], string | null]>([
    "lobby",
    null,
  ]);
  const [activeTab, friendRoom] = target;
  const isFriendList = activeTab === "friend" && !friendRoom;
  const notifications = friendList.filter((item) => !item.isRead).length;
  const chatTabs: ChatTab[] = [
    { id: "lobby", text: "遊戲大廳" },
    { id: "friend", text: "好友聊天", notifications },
    { id: "room", text: "遊戲房" },
  ];

  useEffect(() => {
    const mockMessages = {
      lobby: lobbyMessages,
      room: roomMessages,
      friend: null,
    }[activeTab];

    if (mockMessages) {
      setMessages(mockMessages);
      return;
    }

    const friend = friendList.find((item) => item.target === friendRoom);

    if (!friend) {
      setMessages([]);
      return;
    }

    // Call friend chat room message API?
    setMessages(createMockFriendMessages(friend));
  }, [activeTab, friendRoom, friendList, roomMessages, lobbyMessages]);

  const handleToggleTab = (id: ChatTab["id"]) => setTarget([id, null]);

  const handleToggleTarget = (id: FriendType["target"]) =>
    setTarget(["friend", id]);

  const handleSubmit = (message: MessageType) => {
    if (activeTab === "friend" && !friendRoom) return;
    setMessages((pre) => [...pre, message]);
  };

  return (
    <div
      className="w-[308px] h-[var(--chat-height))] gradient-purple rounded-lg"
      style={{ "--chat-height": maxHeight } as CSSProperties}
    >
      <div className="h-full body-bg border border-transparent bg-clip-padding rounded-lg overflow-hidden">
        <ChatHeader
          tabs={chatTabs}
          activeTab={activeTab}
          onToggle={handleToggleTab}
        />
        <div className="relative h-[calc(var(--chat-height)-120px)] bg-primary-50/4">
          {isFriendList ? (
            <ChatFriendList
              userId={userId}
              friendList={friendList}
              onToggle={handleToggleTarget}
            />
          ) : (
            <>
              {friendRoom && (
                <div className="absolute top-0 inset-x-0 z-10 flex items-center fz-14 text-primary-100 bg-primary-900 p-2 border-b border-gradient-purple">
                  <button
                    onClick={() => handleToggleTab("friend")}
                    aria-label="go to friend tag"
                  >
                    <Icon
                      name="navArrowLeft"
                      className="mr-4 w-6 h-6 stroke-primary-100"
                    />
                  </button>
                  {getTargetUser(friendRoom, userId)}
                </div>
              )}
              <ChatMessages userId={userId} messages={messages} />
            </>
          )}
        </div>
        <ChatInput
          userId={userId}
          onSubmit={handleSubmit}
          disabled={isFriendList}
        />
      </div>
    </div>
  );
}
