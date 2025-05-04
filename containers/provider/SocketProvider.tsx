import React, { useEffect, FC, useState, useRef } from "react";
import SocketContext, { SOCKET_EVENT } from "@/contexts/SocketContext";
import useAuth from "@/hooks/context/useAuth";
import useHistory from "@/hooks/context/useHistory";
import { WebSocketHistoryType } from "@/contexts/HistoryContext";
import { Socket } from "socket.io-client";
import { SocketService } from "@/services/socket";

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
  const { addWsHistory } = useHistory();
  const { currentUser, token } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketServiceRef = useRef(SocketService.getInstance());
  const socketService = socketServiceRef.current;

  useEffect(() => {
    // Initialize the socket service with the token
    socketService.initialize(token);
    // Get the raw socket from the service for backward compatibility
    setSocket(socketService.getSocket());
  }, [token, socketService]);

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

  useEffect(() => {
    if (!currentUser) return;

    // Connect to socket on mount and when current user changes
    const connect = () => socketService.connect();
    const disconnect = () => socketService.disconnect();

    window.addEventListener("beforeunload", disconnect);
    connect();

    return () => {
      window.removeEventListener("beforeunload", disconnect);
      disconnect();
    };
  }, [currentUser, socketService]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      socketService.dispose();
    };
  }, [socketService]);

  return (
    <SocketContext.Provider value={{ socketService, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
