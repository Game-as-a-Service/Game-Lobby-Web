import { createContext } from "react";
import { Socket } from "socket.io-client";

type StoreContextType = {
  socketStatus: number;
  socket: null | Socket;
  emit: (event: string, data: any) => void;
  disconnect: () => void;
};

export const SocketContext = createContext<Partial<StoreContextType>>({});

export const SOCKET_MESSAGE_URL = "/api/internal/socket/message";
export const SOCKET_URL = "/api/internal/socket/socketio";
