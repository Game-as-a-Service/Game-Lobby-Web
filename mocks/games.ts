import { GameType } from "@/requests/games";
const mock_gameList: GameType[] = [
  {
    id: "123456",
    name: "狼人殺",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 10,
    createdOn: "2024-01-01T00:00:00",
  },
  {
    id: "133456",
    name: "璀璨寶石",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 2,
    maxPlayers: 4,
    createdOn: "2024-01-01T00:00:00",
  },
  {
    id: "133416",
    name: "富饒之城",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 8,
    createdOn: "2024-01-01T00:00:00",
  },

  {
    id: "139456",
    name: "幕後交易",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 6,
    createdOn: "2024-01-01T00:00:00",
  },
  {
    id: "184456",
    name: "農家樂",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 1,
    maxPlayers: 5,
    createdOn: "2024-01-01T00:00:00",
  },
];

export const mock_getGameList = (times?: number): GameType[] => {
  if (!times) return mock_gameList;
  const result = [] as GameType[];

  for (let i = 0; i < times; i++) {
    result.push(
      ...mock_gameList.map((game) => ({
        ...game,
        id: game.id + i.toString(),
      }))
    );
  }
  return result;
};
