import { useContext } from "react";

import RoomContext from "@/contexts/RoomContext";

const useRoom = () => {
  return useContext(RoomContext);
};

export default useRoom;
