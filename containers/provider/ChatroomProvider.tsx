import ChatroomContext from "@/contexts/ChatroomContext";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageType } from "@/components/rooms/RoomChatroom";
import useAuth from "@/hooks/context/useAuth";
import { SOCKET_EVENT, useSocketCore } from "./SocketProvider";

export type ChatroomContextType = ReturnType<typeof useChatroomCore>;

function useChatroomCore() {
  const { socket } = useSocketCore();
  const { currentUser } = useAuth();
  const [lastMessage, setLastMessage] = useState<MessageType | undefined>(
    undefined
  );

  /**
   * Dispatches a socket event to the server.
   * @param {string} action.type - The type of the socket event.
   * @param {any} action.payload - The payload of the socket event.
   */

  useEffect(() => {
    if (!currentUser) return;

    const user = {
      id: currentUser.id,
      nickname: currentUser.nickname,
    };

    socket?.on(SOCKET_EVENT.CHAT_MESSAGE, (data: any) => {
      console.log("Message received in chatroom context", data);
      setLastMessage(data);
    });

    return () => {
      socket?.off(SOCKET_EVENT.CHAT_MESSAGE);
    };
  }, [currentUser, socket]);

  /**
   * Sends a chat message to the server.
   * @param {string} message.content - The content of the message.
   * @param {string} message.to - The target roomId of the message.
   */
  const sendChatMessage = useCallback(
    (message: Pick<MessageType, "content" | "to">) => {
      if (!currentUser) return;
      const payload: MessageType = {
        from: "USER",
        user: { id: currentUser.id, nickname: currentUser.nickname },
        timestamp: new Date().toISOString(),
        ...message,
      };

      socket?.emit(SOCKET_EVENT.CHAT_MESSAGE, payload);
    },
    [currentUser, socket]
  );

  const joinChatroom = useCallback(
    (chatroomId: string) => {
      if (!currentUser) return;
      socket?.emit(SOCKET_EVENT.CHATROOM_JOIN, {
        user: {
          id: currentUser.id,
          nickname: currentUser.nickname,
        },
        chatroomId,
      });
    },
    [currentUser, socket]
  );

  const leaveChatroom = useCallback(
    (chatroomId: string) => {
      if (!currentUser) return;
      socket?.emit(SOCKET_EVENT.CHATROOM_LEAVE, {
        user: {
          id: currentUser.id,
          nickname: currentUser.nickname,
        },
        chatroomId,
      });
    },
    [currentUser, socket]
  );

  return {
    lastMessage,
    sendChatMessage,
    joinChatroom,
    leaveChatroom,
  };
}

export default function ChatroomContextProvider({
  children,
}: PropsWithChildren) {
  const contextValue = useChatroomCore();
  return (
    <ChatroomContext.Provider value={contextValue}>
      {children}
    </ChatroomContext.Provider>
  );
}
