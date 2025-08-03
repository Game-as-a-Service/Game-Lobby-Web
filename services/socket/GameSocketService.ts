import { SOCKET_EVENT } from "@/contexts/socket";
import { BaseSocketService, SocketEventHandler } from "./BaseSocketService";
import { Socket } from "socket.io-client";
import { GameStartedPayload } from "./RoomSocketService";

/**
 * Service class for game-specific socket operations
 *
 * The GameSocketService extends BaseSocketService to provide specialized
 * functionality for game-related socket events. It handles the game lifecycle
 * events such as game start, game end, and custom game-specific events.
 *
 * This service can be extended for specific game types to provide more
 * specialized event handling based on the game requirements.
 */
export class GameSocketService extends BaseSocketService {
  /**
   * Creates a new GameSocketService instance
   * @param {Socket | null} socket - The socket.io Socket instance
   */
  constructor(socket: Socket | null) {
    super(socket);
  }

  /**
   * Register a handler for when a game starts
   *
   * This event is triggered when a game is initiated from a room.
   * The handler receives information about the game including the URL
   * and any other necessary startup parameters.
   *
   * @param {SocketEventHandler<GameStartedPayload>} handler - The callback handler
   * that receives the game URL and other startup information
   */
  public onGameStarted(handler: SocketEventHandler<GameStartedPayload>): void {
    this.on(SOCKET_EVENT.GAME_STARTED, handler);
  }

  /**
   * Remove a handler for the game started event
   *
   * @param {SocketEventHandler<GameStartedPayload>} handler - The handler to remove
   */
  public offGameStarted(handler: SocketEventHandler<GameStartedPayload>): void {
    this.off(SOCKET_EVENT.GAME_STARTED, handler);
  }

  /**
   * Register a handler for when a game ends
   *
   * This event is triggered when an active game session ends, either through
   * normal gameplay completion or forced termination.
   *
   * @param {SocketEventHandler} handler - The callback handler for game end events
   */
  public onGameEnded(handler: SocketEventHandler): void {
    this.on(SOCKET_EVENT.GAME_ENDED, handler);
  }

  /**
   * Remove a handler for the game ended event
   *
   * @param {SocketEventHandler} handler - The handler to remove
   */
  public offGameEnded(handler: SocketEventHandler): void {
    this.off(SOCKET_EVENT.GAME_ENDED, handler);
  }

  /**
   * Register a handler for custom game-specific events
   *
   * This method allows for flexibility in handling different types of
   * game-specific events that may vary by game type. It enables games
   * to define their own event protocols while maintaining type safety.
   *
   * Example usage:
   * ```typescript
   * // For a chess game
   * gameService.onGameEvent<ChessMovePayload>('chess:move', handleChessMove);
   *
   * // For a card game
   * gameService.onGameEvent<CardPlayedPayload>('card:played', handleCardPlayed);
   * ```
   *
   * @template T - The type of data expected from the event
   * @param {string} event - The custom event name to listen for
   * @param {SocketEventHandler<T>} handler - The typed callback handler for the event
   */
  public onGameEvent<T>(event: string, handler: SocketEventHandler<T>): void {
    this.on(event as any, handler);
  }

  /**
   * Remove a handler for a custom game event
   *
   * @template T - The type of data expected from the event
   * @param {string} event - The custom event name
   * @param {SocketEventHandler<T>} handler - The handler to remove
   */
  public offGameEvent<T>(event: string, handler: SocketEventHandler<T>): void {
    this.off(event as any, handler);
  }

  /**
   * Emit a custom game event to the server
   *
   * This method allows for sending game-specific events to the server
   * with properly typed payloads.
   *
   * @template T - The type of payload being sent
   * @param {string} event - The custom event name
   * @param {T} payload - The data to send with the event
   */
  public emitGameEvent<T>(event: string, payload: T): void {
    this.emit(event as any, payload);
  }
}

/**
 * Factory function for creating a game socket service
 *
 * This function provides a convenient way to create a new GameSocketService
 * instance with the given socket. It follows the factory pattern to encapsulate
 * the creation logic and provide a clean API for service instantiation.
 *
 * @param {Socket | null} socket - The socket instance to use
 * @returns {GameSocketService} A new instance of GameSocketService
 */
export const createGameSocketService = (
  socket: Socket | null
): GameSocketService => {
  return new GameSocketService(socket);
};
