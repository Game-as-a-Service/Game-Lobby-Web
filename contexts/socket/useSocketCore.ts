import SocketContext from "./SocketContext";
import { useContext } from "react";
import { SocketService } from "@/services/socket/SocketService";
import { Socket } from "socket.io-client";

interface UseSocketCoreReturn {
  socketService: SocketService;
  socket: Socket | null;
}

/**
 * Hook to access the Socket context
 * Provides access to both the socketService and the raw socket for backward compatibility
 */
const useSocketCore = (): UseSocketCoreReturn => {
  return useContext(SocketContext);
};

export default useSocketCore;
