import SocketContext from "@/contexts/SocketContext";
import { useContext } from "react";

const useSocketCore = () => {
  return useContext(SocketContext);
};

export default useSocketCore;
