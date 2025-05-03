import { Socket } from "socket.io-client";
import { SOCKET_EVENT } from "@/contexts/SocketContext";

/**
 * Type for socket event handler function
 * @template T The type of data received from the server
 */
export type SocketEventHandler<T = any> = (data: T) => void;

/**
 * Configuration for retry mechanism
 */
export interface RetryConfig {
  /** Maximum number of retry attempts */
  maxRetries: number;
  /** Base delay between retries in milliseconds */
  baseDelay: number;
  /** Whether to use exponential backoff strategy */
  useExponentialBackoff: boolean;
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  baseDelay: 1000,
  useExponentialBackoff: true,
};

/**
 * Check if a socket is connected
 * @param socket The socket to check
 * @returns True if the socket exists and is connected
 */
export function isSocketConnected(socket: Socket | null): boolean {
  return !!socket && socket.connected;
}

/**
 * Safely emit an event with payload to the socket
 * Returns whether the emit was successful
 *
 * @param socket The socket to emit on
 * @param event The event name
 * @param payload The payload to send
 * @returns True if the event was emitted successfully
 */
export function safeEmit<T>(
  socket: Socket | null,
  event: SOCKET_EVENT,
  payload: T
): boolean {
  if (!isSocketConnected(socket)) {
    console.warn(`Cannot emit ${event}: Socket not connected`);
    return false;
  }

  try {
    // At this point we know socket is not null because isSocketConnected checks this
    socket!.emit(event, payload);
    return true;
  } catch (error) {
    console.error(`Error emitting ${event}:`, error);
    return false;
  }
}

/**
 * Emit an event with retry logic
 * Will retry the emit if it fails, with configurable backoff
 *
 * @param socket The socket to emit on
 * @param event The event name
 * @param payload The payload to send
 * @param config Retry configuration
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function emitWithRetry<T>(
  socket: Socket | null,
  event: SOCKET_EVENT,
  payload: T,
  config: Partial<RetryConfig> = {}
): Promise<boolean> {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config };

  let retries = 0;

  while (retries <= retryConfig.maxRetries) {
    if (safeEmit(socket, event, payload)) {
      return true;
    }

    if (retries >= retryConfig.maxRetries) {
      break;
    }

    // Calculate delay with exponential backoff if enabled
    const delay = retryConfig.useExponentialBackoff
      ? retryConfig.baseDelay * Math.pow(2, retries)
      : retryConfig.baseDelay;

    await new Promise((resolve) => setTimeout(resolve, delay));
    retries++;
  }

  return false;
}

/**
 * Create a typed event handler for socket events
 * This helps with type safety when handling socket events
 *
 * @template T The type of data received from the server
 * @param handler The event handler function
 * @returns The typed event handler
 */
export function createTypedHandler<T>(
  handler: SocketEventHandler<T>
): SocketEventHandler<T> {
  return handler;
}

/**
 * Debounce a socket emit function
 * Useful for events that may be triggered rapidly
 *
 * @param socket The socket to emit on
 * @param event The event name
 * @param delay The debounce delay in milliseconds
 * @returns A debounced emit function
 */
export function debounceEmit<T>(
  socket: Socket | null,
  event: SOCKET_EVENT,
  delay: number = 300
): (payload: T) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (payload: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      safeEmit(socket, event, payload);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Create a promise that resolves when a specific socket event is received
 * Useful for implementing request-response patterns with sockets
 *
 * @template T The type of data expected in the response
 * @param socket The socket to listen on
 * @param requestEvent The event to emit
 * @param responseEvent The event to listen for as a response
 * @param payload The payload to send with the request
 * @param timeout Timeout in milliseconds (default: 5000)
 * @returns Promise that resolves with the response data or rejects on timeout
 */
export function socketRequestResponse<T, R = any>(
  socket: Socket | null,
  requestEvent: SOCKET_EVENT,
  responseEvent: SOCKET_EVENT,
  payload: T,
  timeout: number = 5000
): Promise<R> {
  if (!isSocketConnected(socket)) {
    return Promise.reject(new Error("Socket not connected"));
  }

  return new Promise<R>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      // We know socket is not null at this point
      socket!.off(responseEvent, responseHandler);
      reject(new Error(`Request timed out after ${timeout}ms`));
    }, timeout);

    const responseHandler = (data: R) => {
      clearTimeout(timeoutId);
      // We know socket is not null at this point
      socket!.off(responseEvent, responseHandler);
      resolve(data);
    };

    // We know socket is not null at this point
    socket!.on(responseEvent, responseHandler);
    safeEmit(socket, requestEvent, payload);
  });
}
