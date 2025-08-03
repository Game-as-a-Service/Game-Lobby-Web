import { GetRoomViewModel as Room, Game, Player } from "@/services/api";

type RoomStatus = "WAITING" | "PLAYING";

// 擴展 Game 類型以包含 mock 需要的屬性
export type MockGame = Game & {
  img?: string;
  minPlayers?: number;
  maxPlayers?: number;
  createdOn?: string;
  rating?: number;
  numberOfComments?: number;
};

// 擴展 Room 類型以包含 MockGame
export type MockRoom = Room & { game: MockGame };

const mock_genRoom = (
  id: string,
  status: RoomStatus
): Room & { game: MockGame } => ({
  id,
  name: `[${id}] - ${status} room`,
  game: {
    id: "mock game id",
    name: "好玩的遊戲",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 2,
    maxPlayers: 8,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.5,
    numberOfComments: 100,
  },
  host: {
    id: "mock user id",
    nickname: "mock user name",
  },
  minPlayers: 1,
  maxPlayers: 8,
  isLocked: Number(id) % 2 === 1,
  currentPlayers: Number(id) % 3 ? 8 : 3,
  players: [
    {
      id: "mock user id",
      nickname: "mock user name",
    },
  ],
  status: status,
});

const mock_genRooms = {
  ["PLAYING"]: new Array(100)
    .fill(undefined)
    .map((_, index) => mock_genRoom(index.toString(), "PLAYING")),
  ["WAITING"]: new Array(100)
    .fill(undefined)
    .map((_, index) => mock_genRoom(index.toString(), "WAITING")),
};

export const mock_rooms = (status: "PLAYING" | "WAITING") => {
  return mock_genRooms[status];
};

export const mock_createRoomResponse: MockRoom = {
  id: "3345678",
  name: "銀河路跑2v2",
  game: {
    id: "456",
    name: "銀河路跑",
    img: "/undefined",
    minPlayers: 2,
    maxPlayers: 7,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.0,
    numberOfComments: 50,
  },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
  },
  isLocked: false,
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
  players: [
    {
      id: "mock-currentUser-uid",
      nickname: "mock currentUser",
    },
  ],
  status: "WAITING",
};

export const mock_roomInfo: MockRoom = {
  id: "3345678",
  name: "銀河路跑2v2",
  status: "WAITING",
  game: {
    id: "456",
    name: "銀河路跑",
    minPlayers: 2,
    maxPlayers: 7,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.0,
    numberOfComments: 50,
  },
  host: {
    id: "mock-currentUser-uid",
    nickname: "mock currentUser",
  },
  isLocked: false,
  players: [
    {
      id: "mock-currentUser-uid",
      nickname: "mock currentUser",
    },
    {
      id: "mock-currentUser-uid-b",
      nickname: "mock user B",
    },
    {
      id: "mock-currentUser-uid-c",
      nickname: "mock user C",
    },
  ],
  currentPlayers: 1,
  minPlayers: 2,
  maxPlayers: 7,
};
