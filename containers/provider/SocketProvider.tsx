import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useRef,
  useCallback,
} from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext, SOCKET_URL } from "../../contexts/SocketContext";
import { Env, getEnv } from "../../lib/env";

export enum SOCKET_EVENT {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  CHATROOM_JOIN = "CHATROOM_JOIN",
  CHATROOM_LEAVE = "CHATROOM_LEAVE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
}

enum SOCKET_STATUS {
  CONNECTING = 0,
  OPEN,
  CLOSED,
}

export const useSocketCore = () => useContext(SocketContext);

export const SocketProvider = ({ children }: PropsWithChildren) => {
  const [socketStatus, setSocketStatus] = useState<SOCKET_STATUS>(
    SOCKET_STATUS.CONNECTING
  );
  const socket = useRef<null | Socket>(null);

  const { internalEndpoint, env } = getEnv();

  useEffect(() => {
    socket.current = io(
      internalEndpoint || "",
      env === Env.DEV
        ? {
            path: SOCKET_URL,
            addTrailingSlash: false,
          }
        : {}
    );

    socket.current
      .on(SOCKET_EVENT.CONNECT, () => {
        console.log("SOCKET CONNECTED IN CLIENT! ", socket.current?.id);
        setSocketStatus(SOCKET_STATUS.OPEN);
      })
      .on(SOCKET_EVENT.DISCONNECT, () => {
        console.log("SOCKET DISCONNECTED IN CLIENT! ", socket.current?.id);
        setSocketStatus(SOCKET_STATUS.CLOSED);
      });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const emit = useCallback(
    async (event: string, data: any) => {
      if (!socket) {
        console.log("socket is null");
        return;
      }

      try {
        socket.current?.emit(event, data, (response: any) => {
          console.log("response after emitting", event, response);
        });
      } catch (error) {
        console.error(error);
      }
    },
    [socket]
  );

  const disconnect = useCallback(() => {
    if (socket.current) {
      socket.current?.disconnect();
      socket.current = null;
    }
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socketStatus, socket: socket.current, emit, disconnect }}
    >
      {children}
    </SocketContext.Provider>
  );
};
