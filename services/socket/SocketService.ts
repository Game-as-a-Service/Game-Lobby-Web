import { Socket } from "socket.io-client";
import { createSocket, SOCKET_EVENT } from "@/contexts/SocketContext";
import {
  RoomSocketService,
  createRoomSocketService,
} from "./RoomSocketService";
import {
  ChatSocketService,
  createChatSocketService,
} from "./ChatSocketService";
import {
  GameSocketService,
  createGameSocketService,
} from "./GameSocketService";

/**
 * Main Socket Service that coordinates all specialized socket services
 * This service provides a unified interface for socket operations across the application,
 * including room, chat, and game-related functionality.
 *
 * The SocketService acts as a facade, delegating specialized socket operations to
 * dedicated services while managing the lifecycle of the socket connection.
 */
export class SocketService {
  /**
   * Singleton instance of the SocketService
   */
  private static instance: SocketService | null = null;

  /**
   * The underlying socket.io Socket instance
   */
  private socket: Socket | null = null;

  /**
   * Service handling room-related socket operations
   */
  private roomService: RoomSocketService;

  /**
   * Service handling chat-related socket operations
   */
  private chatService: ChatSocketService;

  /**
   * Service handling game-related socket operations
   */
  private gameService: GameSocketService;

  /**
   * Creates a new SocketService instance and initializes specialized services
   * No socket connection is established until initialize() is called
   *
   * This constructor is private to prevent direct instantiation
   */
  private constructor() {
    this.roomService = createRoomSocketService(null);
    this.chatService = createChatSocketService(null);
    this.gameService = createGameSocketService(null);
  }

  /**
   * Get the singleton instance of SocketService
   * @returns {SocketService} The singleton instance
   */
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  /**
   * Initialize the socket connection with optional authentication token
   * If a socket connection already exists, it will be disposed first
   *
   * @param {string | null | undefined} token - Optional authentication token for socket connection
   */
  public initialize(token: string | null | undefined): void {
    if (this.socket) {
      this.dispose();
    }

    this.socket = createSocket(token);
    this.roomService.setSocket(this.socket);
    this.chatService.setSocket(this.socket);
    this.gameService.setSocket(this.socket);
  }

  /**
   * Connect to the socket server
   * Has no effect if the socket is already connected or doesn't exist
   */
  public connect(): void {
    if (!this.socket || this.socket.connected) return;
    this.socket.connect();
  }

  /**
   * Disconnect from the socket server
   * Has no effect if the socket is already disconnected or doesn't exist
   */
  public disconnect(): void {
    if (!this.socket || !this.socket.connected) return;
    this.socket.disconnect();
  }

  /**
   * Get the raw socket.io Socket instance
   * This provides direct access to the socket for advanced use cases
   *
   * @returns {Socket | null} The socket instance or null if not initialized
   */
  public getSocket(): Socket | null {
    return this.socket;
  }

  /**
   * Get the room service for room-related socket operations
   *
   * @returns {RoomSocketService} The room socket service instance
   */
  public room(): RoomSocketService {
    return this.roomService;
  }

  /**
   * Get the chat service for chat-related socket operations
   *
   * @returns {ChatSocketService} The chat socket service instance
   */
  public chat(): ChatSocketService {
    return this.chatService;
  }

  /**
   * Get the game service for game-related socket operations
   *
   * @returns {GameSocketService} The game socket service instance
   */
  public game(): GameSocketService {
    return this.gameService;
  }

  /**
   * Register a handler for the socket connect event
   * Useful for executing logic when the socket connection is established
   *
   * @param {() => void} handler - Function to execute when socket connects
   */
  public onConnect(handler: () => void): void {
    this.socket?.on(SOCKET_EVENT.CONNECT, handler);
  }

  /**
   * Register a handler for the socket disconnect event
   * Useful for executing logic when the socket connection is lost
   *
   * @param {() => void} handler - Function to execute when socket disconnects
   */
  public onDisconnect(handler: () => void): void {
    this.socket?.on(SOCKET_EVENT.DISCONNECT, handler);
  }

  /**
   * Clean up the socket service and all specialized services
   * Removes all event listeners, disconnects the socket, and cleans up resources
   * Should be called when the service is no longer needed to prevent memory leaks
   */
  public dispose(): void {
    this.roomService.dispose();
    this.chatService.dispose();
    this.gameService.dispose();

    if (this.socket) {
      this.socket.off(SOCKET_EVENT.CONNECT);
      this.socket.off(SOCKET_EVENT.DISCONNECT);
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
