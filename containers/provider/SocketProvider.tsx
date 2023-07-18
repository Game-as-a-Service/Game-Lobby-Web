import React, {
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import {
  SocketContext,
  SOCKET_MESSAGE_URL,
  SOCKET_URL,
} from "../../contexts/SocketContext";
import { Env, getEnv } from "../../lib/env";

export enum SOCKET_EVENT {
  CONNECTION_OPEN = "CONNECTION_OPEN",
  CONNECTION_CLOSE = "CONNECTION_CLOSE",
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
  const [socket, setSocket] = useState<null | Socket>(null);
  // const socket = useRef<null | Socket>(null);

  const { internalEndpoint, env } = getEnv();

  useEffect(() => {
    const socket = io(
      internalEndpoint || "",
      env === Env.DEV
        ? {
            path: SOCKET_URL,
            addTrailingSlash: false,
          }
        : {}
    );

    socket
      .on(SOCKET_EVENT.CONNECTION_OPEN, () => {
        console.log("SOCKET CONNECTED!", socket.id);
        setSocketStatus(SOCKET_STATUS.OPEN);
      })
      .on(SOCKET_EVENT.CONNECTION_CLOSE, () => {
        setSocketStatus(SOCKET_STATUS.CLOSED);
      });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const emit = async (event: string, data: any) => {
    try {
      const response = await fetch(SOCKET_MESSAGE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("emit", event, "\nresponse:", response);
    } catch (error) {
      if (error instanceof Error) console.error(error?.message);
    }

    // if (env === Env.DEV) {
    //   try {
    //     const response = await fetch(SOCKET_MESSAGE_URL, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     });

    //     console.log("emit", event, "\nresponse:", response);
    //   } catch (error) {
    //     if (error instanceof Error) console.error(error?.message);
    //   }
    // } else {
    //   socket?.emit(event, data, (response: any) => {
    //     console.log("emit", event, response.status);
    //   });
    // }
  };

  const disconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{ socketStatus, socket, emit, disconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
