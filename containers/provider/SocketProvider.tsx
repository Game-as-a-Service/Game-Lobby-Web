import React, {
  useEffect,
  PropsWithChildren,
  useCallback,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { Env, getEnv } from "../../lib/env";
import SocketContext, {
  SOCKET_URL,
  SOCKET_EVENT,
} from "@/contexts/SocketContext";

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const socket = useRef<null | Socket>(null);
  const { internalEndpoint, env } = getEnv();

  useEffect(() => {
    connect();
    return () => {
      socket.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = useCallback(() => {
    if (socket.current?.connected || internalEndpoint === undefined) return;
    const options =
      env === Env.DEV ? { path: SOCKET_URL, addTrailingSlash: false } : {};
    socket.current = io(internalEndpoint, options);
    socket.current
      ?.on(SOCKET_EVENT.CONNECT, () => {
        // eslint-disable-next-line no-console
        console.log("SOCKET CONNECTED IN CLIENT! ", socket.current?.id);
      })
      .on(SOCKET_EVENT.DISCONNECT, () => {
        // eslint-disable-next-line no-console
        console.log("SOCKET DISCONNECTED IN CLIENT! ", socket.current?.id);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket.current?.connected) {
      socket.current?.disconnect();
      socket.current = null;
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket: socket.current, connect, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};
