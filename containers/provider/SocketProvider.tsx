import React, { useEffect, FC, useState, useRef } from "react";
import SocketContext, { SOCKET_EVENT } from "@/contexts/SocketContext";
import useAuth from "@/hooks/context/useAuth";
import useHistory from "@/hooks/context/useHistory";
import { WebSocketHistoryType } from "@/contexts/HistoryContext";
import { Socket } from "socket.io-client";
import socketService from "@/services/socket";

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const { addWsHistory } = useHistory();
  const { token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (token) {
      socketService.initialize(token);
      socketService.connect();
      setSocket(socketService.getSocket());
    } else {
      socketService.dispose();
      socketService.disconnect();
      setSocket(null);
    }

    return () => {
      socketService.dispose();
      socketService.disconnect();
      setSocket(null);
    };
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    // Connect event
    socketService.onConnect(() => {
      addWsHistory({
        type: WebSocketHistoryType.CONNECTION,
        event: "CONNECT",
        message: "",
      });
    });

    // Disconnect event
    socketService.onDisconnect(() => {
      addWsHistory({
        type: WebSocketHistoryType.CONNECTION,
        event: "DISCONNECT",
        message: "",
      });
    });

    // Any event received
    socket.onAny((event: keyof typeof SOCKET_EVENT, data) => {
      addWsHistory({
        type: WebSocketHistoryType.RECEIVE,
        event,
        message: data,
      });
    });

    // Any event sent
    socket.onAnyOutgoing((event: keyof typeof SOCKET_EVENT, data) => {
      addWsHistory({
        type: WebSocketHistoryType.SEND,
        event,
        message: data,
      });
    });

    return () => {
      socket
        .off(SOCKET_EVENT.CONNECT)
        .offAny()
        .offAnyOutgoing()
        .off(SOCKET_EVENT.DISCONNECT);
    };
  }, [socket, addWsHistory]);

  return (
    <SocketContext.Provider value={{ socketService, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
