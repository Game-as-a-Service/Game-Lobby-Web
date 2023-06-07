import { useState, useEffect, useContext } from "react";

import { cn } from "@/lib/utils";
import UiContext from "@/contexts/UiContext";
import Avatar from "../Avatar";
import Tabs from "../Tabs";
import Button from "../Button";
import ChatMessage from "./ChatMessage";
import ChatContent from "./ChatContent";

enum TabsProps {
  PUBLIC = "PUBLIC",
  TEAM = "TEAM",
  FRIENDS = "FRIENDS",
}

const mock_messages = Array.from({ length: 20 }, (_, i) => ({
  isMe: !(i % 3),
  id: crypto.randomUUID(),
  nickname: !(i % 3) ? "玩家1" : "玩家2",
  message: `聊天內容${i}`,
}));

const tabs = [
  {
    key: TabsProps.PUBLIC,
    label: "公開聊天",
  },
  {
    key: TabsProps.TEAM,
    label: "遊戲隊聊",
  },
  {
    key: TabsProps.FRIENDS,
    label: "好友聊天",
  },
];

const Chat = () => {
  const { openChat } = useContext(UiContext);
  const [selectedTab, setSelectedTab] = useState<string>(TabsProps.PUBLIC);
  const [message, setMessage] = useState<string>();

  // if Chat is not open then the React component will not render
  if (!openChat) return <></>;

  return (
    <div className="chat__container fixed right-0 top-[60px] flex flex-col flex-grow max-w-[262px] max-h-[calc(100vh-60px)] bg-dark29 rounded-[10px] overflow-hidden">
      <Tabs
        tabsClass="tabs__wrap"
        defaultActiveKey={selectedTab}
        tabs={tabs}
        size="default"
        onChange={(key) => setSelectedTab(key as string)}
      />

      {/* TODO: 尚未串接 API 再根據 API 文件調整 */}
      <ChatContent>
        {mock_messages.map((data) => (
          <ChatMessage
            key={data.id}
            isMe={data.isMe}
            nickname={data.nickname}
            message={data.message}
          />
        ))}
      </ChatContent>

      <div className="chat__footer  flex flex-row flex-grow gap-2 w-full p-[7px_9px] bg-dark21">
        <div
          className="w-full max-h-[120px] overflow-auto break-all message outline-none text-white bg-gray2d p-[5px_7px]"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setMessage(e.target.innerText)}
        >
          {message}
        </div>
        <Button
          className="w-full justify-center max-w-[60px] px-0"
          variant="secondary"
          onClick={() => {
            mock_messages.push({
              id: crypto.randomUUID(),
              isMe: true,
              nickname: "玩家1",
              message: message || "",
            });
            setMessage("");
          }}
        >
          發送
        </Button>
      </div>
    </div>
  );
};

export default Chat;
