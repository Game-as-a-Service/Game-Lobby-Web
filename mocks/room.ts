import { Room, RoomType } from "@/requests/rooms";

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
    isLock: false,
    currentPlayers: 1,
  };
};

export const mock_rooms = (status: RoomType) => {
  return new Array(100)
    .fill(undefined)
    .map((item, index) => mock_genRoom(index.toString(), status));
};
