import ChatroomContext from "@/contexts/ChatroomContext";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { MessageType } from "@/components/rooms/RoomChatroom";
import useAuth from "@/hooks/context/useAuth";
import useSocketCore from "@/hooks/context/useSocketCore";
import { SOCKET_EVENT } from "@/contexts/SocketContext";

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

    socket?.on(SOCKET_EVENT.CHAT_MESSAGE, (data: any) => {
      setLastMessage(data);
    });

    return () => {
      socket?.off(SOCKET_EVENT.CHAT_MESSAGE);
    };
  }, [currentUser, socket]);

  /**
   * Sends a chat message to the server.
   * @param {string} message.content - The content of the message.
   * @param {string} message.target - The target chatroomId of the message.
   */
  const sendChatMessage = useCallback(
    (message: Pick<MessageType, "content" | "target">) => {
      if (!currentUser) return;
      const payload: Omit<MessageType, "timestamp"> = {
        from: { id: currentUser.id, nickname: currentUser.nickname },
        ...message,
      };
      if (socket) {
        socket?.emit(SOCKET_EVENT.CHAT_MESSAGE, payload);
      }
    },
    [currentUser, socket]
  );

  const joinChatroom = useCallback(
    (roomId: string) => {
      if (!currentUser) return;
      if (socket) {
        const payload = {
          user: {
            id: currentUser.id,
            nickname: currentUser.nickname,
          },
          target: `ROOM_${roomId}`,
        };
        socket?.emit(SOCKET_EVENT.JOIN_ROOM, payload);
      }
    },
    [currentUser, socket]
  );

  const leaveChatroom = useCallback(
    (roomId: string) => {
      if (!currentUser) return;
      if (socket) {
        const payload = {
          user: {
            id: currentUser.id,
            nickname: currentUser.nickname,
          },
          target: `ROOM_${roomId}`,
        };
        socket?.emit(SOCKET_EVENT.LEAVE_ROOM, payload);
      }
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
