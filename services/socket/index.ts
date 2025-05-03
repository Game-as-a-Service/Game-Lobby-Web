/**
 * Socket Service Module
 *
 * This module provides a comprehensive and modular approach to socket communication
 * in the Game Lobby Web application.
 *
 * The architecture follows a domain-driven design with specialized services for
 * different aspects of socket communication (rooms, chat, games).
 */

// Export services
export { BaseSocketService } from "./BaseSocketService";
export { SocketService, socketService } from "./SocketService";
export {
  RoomSocketService,
  createRoomSocketService,
} from "./RoomSocketService";
export {
  ChatSocketService,
  createChatSocketService,
} from "./ChatSocketService";
export {
  GameSocketService,
  createGameSocketService,
} from "./GameSocketService";

// Export types and utilities
export * from "./utils";

/**
 * Socket Service Architecture
 *
 * The socket service follows a hierarchical organization:
 *
 * 1. BaseSocketService - Core socket functionality
 *    ↑
 * 2. Specialized Services - Domain-specific implementations
 *    - RoomSocketService - Room management
 *    - ChatSocketService - Chat functionality
 *    - GameSocketService - Game events
 *    ↑
 * 3. SocketService - Coordinates all specialized services
 *
 * Each service provides type-safe event handling with proper
 * resource management to prevent memory leaks.
 *
 * The API is designed to be intuitive and consistent across services,
 * while also providing specialized functionality for each domain.
 */
