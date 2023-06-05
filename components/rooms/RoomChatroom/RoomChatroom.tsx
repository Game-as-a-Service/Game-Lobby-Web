import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect } from "react";
import Button from "@/components/shared/Button";
import ChatMessage from "./ChatMessage";
import { MessageType } from ".";
import useChatroom from "@/hooks/context/useChatroom";

export type RoomChatroom = {
  roomId: string;
};

function RoomChatroom({ roomId }: RoomChatroom) {
  const {
    lastMessage,
    sendChatMessage,
    joinChatroom,
    leaveChatroom,
    readyState,
  } = useChatroom();
  const scrollbarRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [messageList, setMessageList] = useState<MessageType[]>([]);

  // join chatroom by roomId
  useEffect(() => {
    if (!roomId) return;
    if (readyState < 1) return;
    joinChatroom(roomId);

    return () => leaveChatroom(roomId);
  }, [joinChatroom, leaveChatroom, roomId, readyState]);

  // update message list while received new message from websocket
  useEffect(() => {
    if (!lastMessage || !roomId) return;
    if (lastMessage.to === roomId || lastMessage.to === "ALL") {
      setMessageList((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage, roomId]);

  // scroll to bottom when messageList updated
  useEffect(() => {
    scrollbarRef.current?.scrollTo({
      top: scrollbarRef.current.scrollHeight,
    });
  }, [messageList]);

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.code === "Enter" && event.key !== "Process") {
      event.preventDefault();
      handleSubmitText();
    }
  }

  function handleSubmitText() {
    if (!inputValue) return;
    const data: Pick<MessageType, "content" | "to"> = {
      content: inputValue,
      to: roomId,
    };
    sendChatMessage(data);
    setInputValue("");
  }
  return (
    <div className="h-full flex flex-col">
      <div
        className="scrollbar grow bg-[#1E1F22] border border-[#2D2D2E] rounded-t-[10px] py-[9px] px-3 overflow-y-auto h-[137px] snap-end"
        ref={scrollbarRef}
      >
        {messageList.map((msg, index) => (
          <ChatMessage {...msg} key={msg.timestamp + index} />
        ))}
      </div>
      <div className="bg-[#2D2D2E] py-[5px] px-[7px] flex">
        <textarea
          role="textarea"
          className="w-full bg-[#1E1F22] resize-none focus:outline-none text-sm px-[13px] py-[9px] h-[38px] scrollbar"
          value={inputValue}
          onChange={handleTextChange}
          onKeyDown={handleInputKeyDown}
        />
        <Button
          type="button"
          variant="primary"
          className=" w-32 flex justify-center rounded-l-none"
          onClick={handleSubmitText}
        >
          發送
        </Button>
      </div>
    </div>
  );
}

export default RoomChatroom;
