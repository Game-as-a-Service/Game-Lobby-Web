import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth";
import { useSocketCore } from "../socket";
import type { MessageType } from "@/components/shared/Chat/ChatMessages";

/**
 * Hook for chat room operations using the new socket service architecture
 */
export default function useChatroomService() {
  const { socketService } = useSocketCore();
  const { currentUser } = useAuth();
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);
  const chatService = socketService.chat();

  // Set up event listeners
  useEffect(() => {
    if (!currentUser) return;

    // Listen for chat messages
    chatService.onChatMessage((data: MessageType) => {
      setLastMessage(data);
    });

    // Clean up when unmounting
    return () => {
      chatService.offAll("CHAT_MESSAGE" as any);
    };
  }, [currentUser, chatService]);

  /**
   * Sends a chat message to the server.
   */
  const sendChatMessage = useCallback(
    (message: Pick<MessageType, "content" | "target">) => {
      if (!currentUser) return;
      chatService.sendMessage(message, {
        id: currentUser.id,
        nickname: currentUser.nickname,
      });
    },
    [currentUser, chatService]
  );

  /**
   * Join a chat room
   */
  const joinChatroom = useCallback(
    (roomId: string) => {
      if (!currentUser) return;
      chatService.joinChatroom(roomId, {
        id: currentUser.id,
        nickname: currentUser.nickname,
      });
    },
    [currentUser, chatService]
  );

  /**
   * Leave a chat room
   */
  const leaveChatroom = useCallback(
    (roomId: string) => {
      setLastMessage(null);
      if (!currentUser) return;
      chatService.leaveChatroom(roomId, {
        id: currentUser.id,
        nickname: currentUser.nickname,
      });
    },
    [currentUser, chatService]
  );

  return {
    lastMessage,
    sendChatMessage,
    joinChatroom,
    leaveChatroom,
  };
}
