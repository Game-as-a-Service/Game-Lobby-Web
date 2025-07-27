import { SOCKET_EVENT } from "@/contexts/socket";
import { BaseSocketService, SocketEventHandler } from "./BaseSocketService";
import { Socket } from "socket.io-client";
import { Player } from "@/api";

export type RoomUser = Player;
export type UserReadyPayload = Pick<Player, "id">;

export interface RoomJoinPayload {
  user: RoomUser;
  target: string;
}

export interface GameStartedPayload {
  gameUrl: string;
}

/**
 * Service class for managing room-related socket operations
 * Handles joining/leaving rooms, player status, and game state changes
 */
export class RoomSocketService extends BaseSocketService {
  constructor(socket: Socket | null) {
    super(socket);
  }

  /**
   * Join a game room on the server
   * @param {string} roomId - The ID of the room to join
   * @param {RoomUser} user - The user joining the room
   */
  public joinRoom(roomId: string, user: RoomUser): void {
    const payload: RoomJoinPayload = {
      user,
      target: `ROOM_${roomId}`,
    };
    this.emit(SOCKET_EVENT.JOIN_ROOM, payload);
  }

  /**
   * Leave a game room on the server
   * @param {string} roomId - The ID of the room to leave
   * @param {RoomUser} user - The user leaving the room
   */
  public leaveRoom(roomId: string, user: RoomUser): void {
    const payload: RoomJoinPayload = {
      user,
      target: `ROOM_${roomId}`,
    };
    this.emit(SOCKET_EVENT.LEAVE_ROOM, payload);
  }

  /**
   * Register a handler for when a user joins a room
   * @param {SocketEventHandler<{ user: RoomUser }>} handler - The callback handler
   */
  public onUserJoined(handler: SocketEventHandler<{ user: RoomUser }>): void {
    this.on(SOCKET_EVENT.USER_JOINED, handler);
  }

  /**
   * Register a handler for when a user leaves a room
   * @param {SocketEventHandler<{ user: RoomUser }>} handler - The callback handler
   */
  public onUserLeft(handler: SocketEventHandler<{ user: RoomUser }>): void {
    this.on(SOCKET_EVENT.USER_LEFT, handler);
  }

  /**
   * Register a handler for when the host of a room changes
   * @param {SocketEventHandler<{ user: RoomUser }>} handler - The callback handler
   */
  public onHostChanged(handler: SocketEventHandler<{ user: RoomUser }>): void {
    this.on(SOCKET_EVENT.HOST_CHANGED, handler);
  }

  /**
   * Register a handler for when a game starts in a room
   * @param {SocketEventHandler<GameStartedPayload>} handler - The callback handler
   */
  public onGameStarted(handler: SocketEventHandler<GameStartedPayload>): void {
    this.on(SOCKET_EVENT.GAME_STARTED, handler);
  }

  /**
   * Register a handler for when a game ends in a room
   * @param {SocketEventHandler} handler - The callback handler
   */
  public onGameEnded(handler: SocketEventHandler): void {
    this.on(SOCKET_EVENT.GAME_ENDED, handler);
  }

  /**
   * Register a handler for when a room is closed
   * @param {SocketEventHandler} handler - The callback handler
   */
  public onRoomClosed(handler: SocketEventHandler): void {
    this.on(SOCKET_EVENT.ROOM_CLOSED, handler);
  }
}

/**
 * Factory function for creating a room socket service
 * @param {Socket | null} socket - The socket instance to use
 * @returns {RoomSocketService} A new instance of RoomSocketService
 */
export const createRoomSocketService = (
  socket: Socket | null
): RoomSocketService => {
  return new RoomSocketService(socket);
};
