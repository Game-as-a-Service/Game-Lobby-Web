import { CSSProperties, useEffect, useState } from "react";
import ChatHeader, { ChatTab } from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFriendList, { FriendType, getTargetUser } from "./ChatFriendList";
import ChatInput from "./ChatInput";
import type { MessageType } from "./ChatMessages";
import { createMockFriendMessages } from "./__mocks__/mock";
import Icon from "../../Icon";

export type ChatProps = {
  lobbyMessages: MessageType[];
  friendList: FriendType[];
  roomMessages: MessageType[];
};

export default function Chat({
  lobbyMessages,
  friendList,
  roomMessages,
}: ChatProps) {
  // TODO: userInfo hook
  const { userId } = { userId: "我" };
  const [messages, setMessage] = useState(lobbyMessages);
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
      setMessage(mockMessages);
      return;
    }

    const friend = friendList.find((item) => item.target === friendRoom);

    if (!friend) {
      setMessage([]);
      return;
    }

    setMessage(createMockFriendMessages(friend));
  }, [activeTab, friendRoom, friendList, roomMessages, lobbyMessages]);

  const handleToggleTab = (id: ChatTab["id"]) => setTarget([id, null]);

  const handleToggleTarget = (id: FriendType["target"]) =>
    setTarget(["friend", id]);

  const handleSubmit = (message: MessageType) => {
    if (activeTab === "friend" && !friendRoom) return;
    setMessage((pre) => [...pre, message]);
  };

  return (
    <div
      className="w-[308px] h-[var(--chat-height))] gradient-purple rounded-lg"
      style={{ "--chat-height": "calc(100vh - 10rem)" } as CSSProperties}
    >
      <div className="h-full bg-basic-black border border-transparent bg-clip-padding rounded-lg overflow-hidden">
        <ChatHeader
          tabs={chatTabs}
          activeTab={activeTab}
          onToggle={handleToggleTab}
        />
        <div className="relative h-[calc(var(--chat-height)-120px)] bg-primary-50/4">
          {isFriendList ? (
            <ChatFriendList
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
              <ChatMessages messages={messages} />
            </>
          )}
        </div>
        <ChatInput onSubmit={handleSubmit} disabled={isFriendList} />
      </div>
    </div>
  );
}
