import { useContext } from "react";

import RoomContext from "@/shared/contexts/RoomContext";

const useRoom = () => {
  return useContext(RoomContext);
};

export default useRoom;
