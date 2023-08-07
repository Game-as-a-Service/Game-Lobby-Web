import React, { useState, useEffect, FC, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext, {
  SOCKET_EVENT,
  SOCKET_URL,
} from "@/contexts/SocketContext";
import { Env, getEnv } from "@/lib/env";

type Props = {
  children: React.ReactNode;
};
const { internalEndpoint, env } = getEnv();

export const SocketProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<null | Socket>(null);

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
      })
      .on(SOCKET_EVENT.DISCONNECT, () => {
        setSocket(null);
      });
  }, [socket]);

  const disconnect = useCallback(() => {
    if (!socket?.connected) return;
    socket.disconnect();
  }, [socket]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
