import { Env, getEnv } from "@/lib/env";
import { createContext } from "react";
import { Socket, io } from "socket.io-client";

type StoreContextType = {
  socket: Socket;
};

const { internalEndpoint, env } = getEnv();

export const SOCKET_URL = "/api/internal/socketio";

const config =
  env === Env.DEV || process.env.NEXT_PUBLIC_CI_MODE
    ? {
        path: SOCKET_URL,
        addTrailingSlash: false,
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 10000,
        reconnectionAttempts: Infinity,
      }
    : {
        autoConnect: false,
        reconnection: true,
        reconnectionDelay: 10000,
        reconnectionDelayMax: 10000,
        reconnectionAttempts: Infinity,
      };

export enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CHATROOM_JOIN = "CHATROOM_JOIN",
  CHATROOM_LEAVE = "CHATROOM_LEAVE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
  USER_JOINED = "USER_JOINED",
  USER_LEFT = "USER_LEFT",
  USER_READY = "USER_READY",
  USER_NOT_READY = "USER_NOT_READY",
  GAME_STARTED = "GAME_STARTED",
  GAME_ENDED = "GAME_ENDED",
  HOST_CHANGED = "HOST_CHANGED",
  ROOM_CLOSED = "ROOM_CLOSED",
}

export const socket = io(internalEndpoint, config);

const SocketContext = createContext<StoreContextType>({ socket });

export default SocketContext;
