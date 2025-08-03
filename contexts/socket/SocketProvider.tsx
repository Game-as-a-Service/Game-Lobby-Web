import React, { useEffect, FC, useState } from "react";
import { Socket } from "socket.io-client";
import socketService from "@/services/socket";
import SocketContext from "./SocketContext";
import { useAuth } from "../auth";

type Props = {
  children: React.ReactNode;
};

export const SocketProvider: FC<Props> = ({ children }) => {
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

  return (
    <SocketContext.Provider value={{ socketService, socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
