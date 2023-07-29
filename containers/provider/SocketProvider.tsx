import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);
export default function SocketProvider({ children }: PropsWithChildren<{}>) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const _socket = io("http://localhost:4000");
    setSocket(_socket);

    return () => {
      // 在組件解除掛載時，關閉 Socket 連線
      _socket.disconnect();
    };
  }, []);

  if (socket === null) {
    // Socket 初始化中，可以渲染 Loading 狀態或其他 UI
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
}
