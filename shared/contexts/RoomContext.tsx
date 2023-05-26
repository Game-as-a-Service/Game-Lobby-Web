import { createContext } from "react";
import { UseRoomContextType } from "@/shared/containers/provider/RoomProvider";

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
  initialize: () => {},
  addPlayer: () => {},
  removePlayer: () => {},
  updateHost: () => {},
  updateRoomStatus: () => {},
  toggleUserReadyStatus: () => {},
  cleanRoom: () => {},
});

export default RoomContext;
