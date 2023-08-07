import { createContext } from "react";
import { Socket } from "socket.io-client";

type StoreContextType = {
  socket: null | Socket;
};

export const SOCKET_URL = "/api/internal/socketio";

export enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CHATROOM_JOIN = "CHATROOM_JOIN",
  CHATROOM_LEAVE = "CHATROOM_LEAVE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
}

const SocketContext = createContext<StoreContextType>({
  socket: null,
});

export default SocketContext;
