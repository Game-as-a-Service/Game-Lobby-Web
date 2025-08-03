import { Socket } from "socket.io-client";
import { SOCKET_EVENT } from "@/contexts/socket";

/**
 * Interface representing a socket event handler function
 * @template T - The type of data received from the server
 */
export interface SocketEventHandler<T = any> {
  (data: T): void;
}

/**
 * Base abstract service class for socket operations
 * Provides common functionality for socket event handling and management
 * Specialized services should extend this class
 */
export abstract class BaseSocketService {
  /**
   * The socket.io Socket instance
   */
  protected socket: Socket | null = null;

  /**
   * Map of event names to sets of handler functions
   */
  protected eventHandlers: Map<string, Set<SocketEventHandler>> = new Map();

  /**
   * Creates a new instance of BaseSocketService
   * @param {Socket | null} socket - The socket.io Socket instance
   */
  constructor(socket: Socket | null) {
    this.socket = socket;
  }

  /**
   * Update the socket instance and manage event listeners
   * @param {Socket | null} socket - The new socket instance
   */
  public setSocket(socket: Socket | null) {
    const hadSocket = !!this.socket;
    const hasNewSocket = !!socket;

    // Clean up old socket listeners if there was a socket
    if (hadSocket) {
      this.cleanupSocketListeners();
    }

    // Update socket reference
    this.socket = socket;

    // Setup listeners for new socket
    if (hasNewSocket) {
      this.setupSocketListeners();
    }
  }

  /**
   * Register a handler for a socket event
   * @template T - The type of data received from the event
   * @param {SOCKET_EVENT} event - The event to listen for
   * @param {SocketEventHandler<T>} handler - The callback function to execute when the event occurs
   */
  public on<T = any>(
    event: SOCKET_EVENT,
    handler: SocketEventHandler<T>
  ): void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());

      // If we already have a socket, attach the listener right away
      if (this.socket) {
        this.attachSocketListener(event);
      }
    }

    this.eventHandlers.get(event)!.add(handler as SocketEventHandler);
  }

  /**
   * Remove a specific handler for a socket event
   * @param {SOCKET_EVENT} event - The event to remove the handler from
   * @param {SocketEventHandler} handler - The specific handler to remove
   */
  public off(event: SOCKET_EVENT, handler: SocketEventHandler): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.delete(handler);

      // If no handlers remain, remove the socket listener
      if (handlers.size === 0) {
        this.eventHandlers.delete(event);
        this.socket?.off(event);
      }
    }
  }

  /**
   * Remove all handlers for a specific event
   * @param {SOCKET_EVENT} event - The event to remove all handlers for
   */
  public offAll(event: SOCKET_EVENT): void {
    this.eventHandlers.delete(event);
    this.socket?.off(event);
  }

  /**
   * Emit an event to the server
   * @template T - The type of payload being sent
   * @param {SOCKET_EVENT} event - The event to emit
   * @param {T} payload - The data to send with the event
   */
  protected emit<T>(event: SOCKET_EVENT, payload: T): void {
    if (!this.socket) return;
    this.socket.emit(event, payload);
  }

  /**
   * Setup all registered event listeners on the socket
   * Called automatically when a new socket is set
   */
  private setupSocketListeners(): void {
    // Convert the Map keys iterator to an array before iteration
    const events = Array.from(this.eventHandlers.keys());
    for (const event of events) {
      this.attachSocketListener(event);
    }
  }

  /**
   * Attach a socket listener for a specific event
   * @param {string} event - The event name to listen for
   */
  private attachSocketListener(event: string): void {
    if (!this.socket) return;

    this.socket.on(event, (data: unknown) => {
      const handlers = this.eventHandlers.get(event);
      if (handlers) {
        handlers.forEach((handler) => handler(data));
      }
    });
  }

  /**
   * Clean up all socket listeners
   * Called automatically when the socket is changed or service is disposed
   */
  private cleanupSocketListeners(): void {
    if (!this.socket) return;

    // Convert the Map keys iterator to an array before iteration
    const events = Array.from(this.eventHandlers.keys());
    for (const event of events) {
      this.socket.off(event);
    }
  }

  /**
   * Dispose of the service, cleaning up all listeners and references
   * Should be called when the service is no longer needed
   */
  public dispose(): void {
    this.cleanupSocketListeners();
    this.eventHandlers.clear();
    this.socket = null;
  }
}
