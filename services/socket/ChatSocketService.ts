import { SOCKET_EVENT } from "@/contexts/socket";
import { BaseSocketService, SocketEventHandler } from "./BaseSocketService";
import { Socket } from "socket.io-client";
import { MessageType } from "@/components/shared/Chat/ChatMessages";
import { RoomUser } from "./RoomSocketService";

export type ChatMessagePayload = Omit<MessageType, "timestamp">;

/**
 * Service class for managing chat-related socket operations
 */
export class ChatSocketService extends BaseSocketService {
  constructor(socket: Socket | null) {
    super(socket);
  }

  /**
   * Join a chat room on the server
   * @param {string} roomId - The room ID to join
   * @param {RoomUser} user - The user joining the room
   */
  public joinChatroom(roomId: string, user: RoomUser): void {
    const payload = {
      user,
      target: `ROOM_${roomId}`,
    };
    this.emit(SOCKET_EVENT.JOIN_ROOM, payload);
  }

  /**
   * Leave a chat room on the server
   * @param {string} roomId - The room ID to leave
   * @param {RoomUser} user - The user leaving the room
   */
  public leaveChatroom(roomId: string, user: RoomUser): void {
    const payload = {
      user,
      target: `ROOM_${roomId}`,
    };
    this.emit(SOCKET_EVENT.LEAVE_ROOM, payload);
  }

  /**
   * Sends a chat message to the server.
   * @param {Pick<MessageType, "content" | "target">} message - The message content and target
   * @param {RoomUser} user - The user sending the message
   */
  public sendMessage(
    message: Pick<MessageType, "content" | "target">,
    user: RoomUser
  ): void {
    const payload: ChatMessagePayload = {
      from: { id: user.id, nickname: user.nickname },
      ...message,
    };
    this.emit(SOCKET_EVENT.CHAT_MESSAGE, payload);
  }

  /**
   * Register a handler for incoming chat messages
   * @param {SocketEventHandler<MessageType>} handler - The callback handler for chat messages
   */
  public onChatMessage(handler: SocketEventHandler<MessageType>): void {
    this.on(SOCKET_EVENT.CHAT_MESSAGE, handler);
  }
}

/**
 * Factory function for creating a chat socket service
 * @param {Socket | null} socket - The socket instance to use
 * @returns {ChatSocketService} A new instance of ChatSocketService
 */
export const createChatSocketService = (
  socket: Socket | null
): ChatSocketService => {
  return new ChatSocketService(socket);
};
