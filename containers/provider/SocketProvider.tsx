import React, { useEffect, FC, useCallback } from "react";
import SocketContext, { socket, SOCKET_EVENT } from "@/contexts/SocketContext";
import useAuth from "@/hooks/context/useAuth";
import useHistory from "@/hooks/context/useHistory";
import { WebSocketHistoryType } from "@/contexts/HistoryContext";

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const { addWsHistory } = useHistory();
  const { currentUser } = useAuth();

  const connect = useCallback(() => {
    if (socket?.connected) return;
    socket.connect();
  }, []);

  const disconnect = useCallback(() => {
    if (!socket?.connected) return;
    socket.disconnect();
  }, []);

  useEffect(() => {
    socket
      .on(SOCKET_EVENT.CONNECT, () => {
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
        .off(SOCKET_EVENT.CONNECT)
        .offAny()
        .offAnyOutgoing()
        .off(SOCKET_EVENT.DISCONNECT);
    };
  }, [addWsHistory]);

  useEffect(() => {
    if (!currentUser) return;
    window.addEventListener("beforeunload", disconnect);
    connect();
    return () => {
      window.removeEventListener("beforeunload", disconnect);
      disconnect();
    };
  }, [connect, disconnect, currentUser]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
