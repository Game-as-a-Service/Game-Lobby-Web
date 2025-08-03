import { useEffect, useState } from "react";
import Icon from "@/components/shared/Icon";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth";
import ChatHeader, { ChatTab } from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatFriendList, { FriendType, getTargetUser } from "./ChatFriendList";
import ChatInput from "./ChatInput";
import type { MessageType } from "./ChatMessages";
// import { createMockFriendMessages } from "./__mocks__/mock";

type ChatProps = {
  roomId?: string;
  lobbyMessages: MessageType[];
  friendList: FriendType[];
  roomMessages: MessageType[];
  className?: string;
  defaultTarget?: ChatTab["id"];
  onSubmit: (message: Pick<MessageType, "content" | "target">) => void;
};

export default function Chat({
  roomId,
  lobbyMessages,
  friendList,
  roomMessages,
  className,
  defaultTarget,
  onSubmit,
}: Readonly<ChatProps>) {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState(lobbyMessages);
  const [target, setTarget] = useState<[ChatTab["id"], string | null]>([
    defaultTarget || "lobby",
    null,
  ]);
  const [activeTab, friendRoom] = target;
  const isFriendList = activeTab === "friend" && !friendRoom;
  // const notifications = friendList.filter((item) => !item.isRead).length;
  const chatTabs: ChatTab[] = (
    [
      { id: "lobby", text: "遊戲大廳" },
      { id: "room", text: "遊戲房" },
    ] as const
  ).filter((tab) => (roomId ? true : tab.id !== "room"));

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

    // const friend = friendList.find((item) => item.target === friendRoom);

    // if (!friend) {
    //   setMessages([]);
    //   return;
    // }

    // // Call friend chat room message API?
    // setMessages(createMockFriendMessages(friend));
  }, [activeTab, friendRoom, friendList, roomMessages, lobbyMessages]);

  const handleToggleTab = (id: ChatTab["id"]) => setTarget([id, null]);

  const handleToggleTarget = (id: FriendType["target"]) =>
    setTarget(["friend", id]);

  const handleSubmit = (content: string) => {
    switch (activeTab) {
      case "friend":
        if (!friendRoom) return;
        onSubmit({ target: `TODO:Other`, content });
        break;
      case "room":
        if (!roomId) return;
        onSubmit({ target: `ROOM_${roomId}`, content });
        break;
      case "lobby":
        onSubmit({ target: "LOBBY", content });
        break;
      default:
        break;
    }
  };

  return (
    currentUser && (
      <div className={cn("w-80 gradient-purple rounded-lg", className)}>
        <div className="h-full body-bg border border-transparent bg-clip-padding rounded-lg overflow-hidden">
          <ChatHeader
            tabs={chatTabs}
            activeTab={activeTab}
            onToggle={handleToggleTab}
          />
          <div className="relative h-[calc(100%-182px)] bg-primary-50/4">
            {isFriendList ? (
              <ChatFriendList
                userId={currentUser.id}
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
                        name="NavArrowLeft"
                        className="mr-4 w-6 h-6 stroke-primary-100"
                      />
                    </button>
                    {getTargetUser(friendRoom, currentUser.id)}
                  </div>
                )}
                <ChatMessages userId={currentUser.id} messages={messages} />
              </>
            )}
          </div>
          <ChatInput onSubmit={handleSubmit} disabled={isFriendList} />
        </div>
      </div>
    )
  );
}
