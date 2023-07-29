import { GameListType } from "@/requests/games";
const mock_games: GameListType[] = [
  {
    id: crypto.randomUUID(),
    name: "狼人殺",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 3.5,
    price: "免費",
    category: ["多人", "推理", "桌面"],
  },
  {
    id: crypto.randomUUID(),
    name: "矮人礦坑(Mystic Elven Mines)",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 5,
    price: "免費",
    category: ["多人", "紙牌", "奇幻"],
  },
  {
    id: crypto.randomUUID(),
    name: "Uno",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 0,
    price: "免費",
    category: ["多人", "紙牌", "策略"],
  },
  {
    id: crypto.randomUUID(),
    name: "骰子街(Machi Koro)",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 2,
    price: "免費",
    category: ["多人", "骰子", "益智"],
  },
  {
    id: crypto.randomUUID(),
    name: "富饒之城",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 4.5,
    price: "免費",
    category: ["單人", "紙牌", "策略"],
  },
  {
    id: crypto.randomUUID(),
    name: "踩地雷(Minesweeper)",
    imgUrl: "http://localhost:3030/images/game-avatar.jpg",
    rating: 1,
    price: "免費",
    category: ["單人", "益智"],
  },
];

export const mock_lobbyGames = () => {
  const result: GameListType[] = [];
  for (let i = 0; i < 20; i++) {
    result.push(...mock_games);
  }
  return result;
};
