import { useCallback, useEffect, useState } from "react";
import type { MessageType } from "@/components/shared/Chat/ChatMessages";
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
    if (roomId && lastMessage) {
      setMessageList((prev) => [...prev, lastMessage]);
    } else if (!roomId) {
      setMessageList([]);
    }
  }, [lastMessage, roomId]);

  return {
    roomId,
    messageList,
    isChatVisible,
    openChat,
    sendChatMessage,
    toggleChatVisibility,
  };
}
