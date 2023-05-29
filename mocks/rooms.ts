import { CreateRoomResponseType } from "@/requests/rooms";
import { Room } from "@/requests/rooms";

export const mock_createRoomResponse: CreateRoomResponseType = {
  id: "3345678",
  name: "銀河路跑2v2",
  game: {
    id: "456",
    name: "銀河路跑",
  },
  host: {
    id: "abc",
    nickname: "房間建造者",
  },
  isLocked: false,
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};

export const mock_roomInfo: Room.Infomation = {
  id: "3345678",
  name: "銀河路跑2v2",
  status: "WATTING",
  game: { id: "456", name: "銀河路跑" },
  host: { id: "abc", nickname: "房間創建者", isReady: false },
  isLocked: false,
  players: [{ id: "abc", nickname: "房間創建者", isReady: false }],
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};
