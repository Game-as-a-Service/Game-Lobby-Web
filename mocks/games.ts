import { GameRegistrationViewModel as Game } from "@/services/api";
const mock_gameList: Game[] = [
  {
    id: "123456",
    name: "狼人殺",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 10,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.5,
    numberOfComments: 120,
  },
  {
    id: "133456",
    name: "璀璨寶石",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 2,
    maxPlayers: 4,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.2,
    numberOfComments: 85,
  },
  {
    id: "133416",
    name: "富饒之城",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 8,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.7,
    numberOfComments: 203,
  },

  {
    id: "139456",
    name: "幕後交易",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 3,
    maxPlayers: 6,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.1,
    numberOfComments: 67,
  },
  {
    id: "184456",
    name: "農家樂",
    img: "http://localhost:3030/images/game-avatar.jpg",
    minPlayers: 1,
    maxPlayers: 5,
    createdOn: "2024-01-01T00:00:00",
    rating: 4.3,
    numberOfComments: 94,
  },
];

export const mock_getGameList = (times?: number): Game[] => {
  if (!times) return mock_gameList;
  const result = [] as Game[];

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
