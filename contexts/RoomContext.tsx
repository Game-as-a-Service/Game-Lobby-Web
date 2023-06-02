import { createContext } from "react";
import { UseRoomContextType } from "@/containers/provider/RoomProvider";

export const initRoomInfo: UseRoomContextType["roomInfo"] = {
  id: "",
  name: "string",
  status: "WATTING",
  game: { id: "", name: "" },
  host: { id: "", nickname: "", isReady: false },
  isLocked: false,
  players: [{ id: "", nickname: "", isReady: false }],
  currentPlayers: 0,
  minPlayers: 0,
  maxPlayers: 0,
};

const RoomContext = createContext<UseRoomContextType>({
  roomInfo: initRoomInfo,
  initializeRoom: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
  updateHost: () => {},
  updateRoomStatus: () => {},
  toggleUserReadyStatus: () => {},
  cleanUpRoom: () => {},
});

export default RoomContext;
