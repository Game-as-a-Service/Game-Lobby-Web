import { useCallback, useEffect, useState } from "react";
import type { MessageType } from "@/components/shared/Chat/v2/ChatMessages";
import useChatroom from "./context/useChatroom";
import useSocketCore from "./context/useSocketCore";
import useUser from "./useUser";

export default function useChat() {
  const { lastMessage, sendChatMessage, joinChatroom, leaveChatroom } =
    useChatroom();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const { socket } = useSocketCore();
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const { getRoomId } = useUser();
  const roomId = getRoomId();

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev);
  };

  const openChat = useCallback(() => {
    setIsChatVisible(true);
  }, []);

  // join chatroom by roomId
  useEffect(() => {
    if (!roomId) return;
    if (!socket?.connected) return;
    joinChatroom(roomId);
    return () => leaveChatroom(roomId);
  }, [joinChatroom, leaveChatroom, roomId, socket, socket?.connected]);

  // update message list while received new message from websocket
  useEffect(() => {
    if (!lastMessage || !roomId) return;
    if (lastMessage.target === `ROOM_${roomId}`) {
      setMessageList((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage, roomId]);

  const handleSubmitText = (
    message: Pick<MessageType, "content" | "target">
  ) => {
    if (!message.content) return;
    const data: Pick<MessageType, "content" | "target"> = {
      content: message.content,
      target: message.target,
    };
    sendChatMessage(data);
  };

  return {
    roomId,
    messageList,
    isChatVisible,
    openChat,
    sendChatMessage,
    toggleChatVisibility,
    handleSubmitText,
  };
}
