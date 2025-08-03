/**
 * Socket Service Type Definitions
 *
 * This file contains common type definitions used across the socket service architecture.
 * It provides a centralized location for type definitions to ensure consistency
 * and improve maintainability.
 */

import { Socket } from "socket.io-client";
import { SOCKET_EVENT } from "@/contexts/socket";

/**
 * Socket event data types
 */
export interface PlayerJoinData {
  user: {
    id: string;
    nickname: string;
  };
}

export interface PlayerLeaveData {
  user: {
    id: string;
    nickname: string;
  };
}

export interface GameStartedData {
  gameUrl: string;
}

export interface ChatMessageData {
  id: string;
  message: string;
  user: {
    id: string;
    nickname: string;
  };
  timestamp: string;
}

export interface GameEndedData {
  reason?: string;
}

/**
 * Base interface for all socket services
 * Defines the common methods that all socket services must implement
 */
export interface ISocketService {
  /**
   * Set or update the socket instance used by the service
   * @param socket The new socket instance
   */
  setSocket(socket: Socket | null): void;

  /**
   * Clean up all resources used by the service
   * Should be called when the service is no longer needed
   */
  dispose(): void;
}

/**
 * Interface for socket event handling capabilities
 * @template T The type of events supported
 */
export interface ISocketEventHandler<T = SOCKET_EVENT> {
  /**
   * Register a handler for a socket event
   * @param event The event to listen for
   * @param handler The callback function to execute when the event occurs
   */
  on<D = any>(event: T, handler: (data: D) => void): void;

  /**
   * Remove a specific handler for a socket event
   * @param event The event to remove the handler from
   * @param handler The specific handler to remove
   */
  off<D = any>(event: T, handler: (data: D) => void): void;

  /**
   * Remove all handlers for a specific event
   * @param event The event to remove all handlers for
   */
  offAll(event: T): void;
}

/**
 * Interface for socket room operations
 */
export interface IRoomSocketService
  extends ISocketService,
    ISocketEventHandler {
  /**
   * Join a room with the given room ID
   * @param roomId The ID of the room to join
   */
  joinRoom(roomId: string): void;

  /**
   * Leave the current room
   */
  leaveRoom(): void;

  /**
   * Register a handler for player joined events
   * @param handler The callback handler
   */
  onPlayerJoin(handler: (data: PlayerJoinData) => void): void;

  /**
   * Register a handler for player left events
   * @param handler The callback handler
   */
  onPlayerLeave(handler: (data: PlayerLeaveData) => void): void;

  /**
   * Register a handler for game started events
   * @param handler The callback handler
   */
  onGameStarted(handler: (data: GameStartedData) => void): void;
}

/**
 * Interface for socket chat operations
 */
export interface IChatSocketService
  extends ISocketService,
    ISocketEventHandler {
  /**
   * Send a message to the current chat room
   * @param message The message to send
   */
  sendMessage(message: string): void;

  /**
   * Join a chat room
   * @param roomId The ID of the chat room to join
   */
  joinChatroom(roomId: string): void;

  /**
   * Leave the current chat room
   */
  leaveChatroom(): void;

  /**
   * Register a handler for new message events
   * @param handler The callback handler
   */
  onMessage(handler: (data: ChatMessageData) => void): void;
}

/**
 * Interface for socket game operations
 */
export interface IGameSocketService
  extends ISocketService,
    ISocketEventHandler {
  /**
   * Register a handler for game started events
   * @param handler The callback handler
   */
  onGameStarted(handler: (data: GameStartedData) => void): void;

  /**
   * Register a handler for game ended events
   * @param handler The callback handler
   */
  onGameEnded(handler: (data: GameEndedData) => void): void;

  /**
   * Register a handler for custom game-specific events
   * @param event The custom event name
   * @param handler The callback handler
   */
  onGameEvent<T>(event: string, handler: (data: T) => void): void;
}

/**
 * Player information
 */
export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}

/**
 * Room information
 */
export interface Room {
  id: string;
  name: string;
  host: string;
  players: Player[];
  maxPlayers: number;
  gameType: string;
  isPlaying: boolean;
}

/**
 * Chat message
 */
export interface ChatMessage {
  id: string;
  sender: {
    id: string;
    name: string;
  };
  roomId: string;
  content: string;
  timestamp: number;
}

/**
 * Game started payload
 */
export interface GameStartedPayload {
  gameId: string;
  gameType: string;
  url: string;
  players: Player[];
}

/**
 * Game ended payload
 */
export interface GameEndedPayload {
  gameId: string;
  winner?: string;
  results: {
    playerId: string;
    score: number;
  }[];
}

/**
 * Socket error response
 */
export interface SocketErrorResponse {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
