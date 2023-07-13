import React, { useState, useEffect, FC, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext, {
  SOCKET_EVENT,
  SOCKET_URL,
} from "@/contexts/SocketContext";
import useAuth from "@/hooks/context/useAuth";
import { WebSocketHistoryType } from "@/contexts/ApiHistoryContext";
import useApiHistory from "@/hooks/context/useApiHistory";
import { Env, getEnv } from "@/lib/env";

type Props = {
  children: React.ReactNode;
};
const { internalEndpoint, env } = getEnv();

export const SocketProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  const { addWsHistory } = useApiHistory();
  const { currentUser } = useAuth();

  const connect = useCallback(() => {
    if (socket?.connected) return;

    const config =
      env === Env.DEV
        ? {
            path: SOCKET_URL,
            addTrailingSlash: false,
          }
        : {};

    const newSocket = io(internalEndpoint, config);

    newSocket
      .on(SOCKET_EVENT.CONNECT, () => {
        setSocket(newSocket);
        addWsHistory({
          type: WebSocketHistoryType.CONNECTION,
          event: "CONNECT",
          message: "",
        });
      })
      .onAny((event: keyof typeof SOCKET_EVENT, data) => {
        addWsHistory({
          type: WebSocketHistoryType.RECEIVE,
          event,
          message: data,
        });
      })
      .onAnyOutgoing((event: keyof typeof SOCKET_EVENT, data) => {
        addWsHistory({
          type: WebSocketHistoryType.SEND,
          event,
          message: data,
        });
      })
      .on(SOCKET_EVENT.DISCONNECT, () => {
        addWsHistory({
          type: WebSocketHistoryType.CONNECTION,
          event: "DISCONNECT",
          message: "",
        });
        setSocket(null);
      });
  }, [socket, addWsHistory]);

  const disconnect = useCallback(() => {
    if (!socket?.connected) return;
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    if (!currentUser) return;
    connect();
    return () => disconnect();
  }, [connect, disconnect, currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
