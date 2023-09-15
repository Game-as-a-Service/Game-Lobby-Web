import React, { useEffect, FC, useState } from "react";
import SocketContext, {
  SOCKET_EVENT,
  createSocket,
} from "@/contexts/SocketContext";
import useAuth from "@/hooks/context/useAuth";
import useHistory from "@/hooks/context/useHistory";
import { WebSocketHistoryType } from "@/contexts/HistoryContext";
import { Socket } from "socket.io-client";

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const { addWsHistory } = useHistory();
  const { currentUser, token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(createSocket(token));
  }, [token]);

  useEffect(() => {
    socket
      ?.on(SOCKET_EVENT.CONNECT, () => {
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
      });

    return () => {
      socket
        ?.off(SOCKET_EVENT.CONNECT)
        .offAny()
        .offAnyOutgoing()
        .off(SOCKET_EVENT.DISCONNECT);
    };
  }, [socket, addWsHistory]);

  useEffect(() => {
    const connect = () => {
      if (socket?.connected) return;
      socket?.connect();
    };

    const disconnect = () => {
      if (!socket?.connected) return;
      socket.disconnect();
    };

    if (!currentUser) return;
    window.addEventListener("beforeunload", disconnect);
    connect();
    return () => {
      window.removeEventListener("beforeunload", disconnect);
      disconnect();
    };
  }, [socket, currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
