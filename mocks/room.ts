import { Room, RoomType, RoomInfo } from "@/requests/rooms";

const mock_genRoom = (id: string, status: RoomType): Room => {
  return {
    id,
    name: `[${id}] - ${status} room`,
    game: {
      id: "mock game id",
      name: "好玩的遊戲",
      imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    },
    host: {
      id: "mock user id",
      nickname: "mock user name",
    },
    minPlayers: 1,
    maxPlayers: 7,
    isLocked: true,
    currentPlayers: 1,
  };
};

export const mock_rooms = (status: RoomType) => {
  return new Array(100)
    .fill(undefined)
    .map((item, index) => mock_genRoom(index.toString(), status));
};

export const mock_createRoomResponse: Room = {
  id: "3345678",
  name: "銀河路跑2v2",
  game: {
    id: "456",
    name: "銀河路跑",
    imgUrl: "/undefined",
  },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
  },
  isLocked: false,
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};

export const mock_roomInfo: RoomInfo.Room = {
  id: "3345678",
  name: "銀河路跑2v2",
  status: "WATTING",
  game: { id: "456", name: "銀河路跑" },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
    isReady: false,
  },
  isLocked: false,
  players: [
    {
      id: "mock-currentUser-uid",
      nickname: "mock currentUser",
      isReady: false,
    },
    {
      id: "mock-currentUser-uid1",
      nickname: "mock currentUser1",
      isReady: false,
    },
  ],
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};
