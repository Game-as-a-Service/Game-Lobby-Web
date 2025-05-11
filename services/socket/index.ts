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
import { SocketService } from "./SocketService";

export default SocketService.getInstance();
