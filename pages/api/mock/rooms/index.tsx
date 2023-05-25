import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

const waitingData = {
  rooms: [
    {
      id: "1",
      name: "房間1",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "1",
        nickname: "王小明",
      },
      minPlayers: 1,
      maxPlayers: 7,
      isLock: false,
    },
    {
      id: "2",
      name: "房間2",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "2",
        nickname: "林小華",
      },
      minPlayers: 2,
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "3",
      name: "房間3",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "3",
        nickname: "陳小明",
      },
      minPlayers: 3,
      maxPlayers: 5,
      isLock: false,
    },
    {
      id: "4",
      name: "房間4",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "4",
        nickname: "張小華",
      },
      minPlayers: 2,
      maxPlayers: 6,
      isLock: true,
    },
    {
      id: "5",
      name: "房間5",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "5",
        nickname: "吳小明",
      },
      minPlayers: 1,
      maxPlayers: 8,
      isLock: false,
    },
    {
      id: "6",
      name: "房間6",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "6",
        nickname: "劉小華",
      },
      minPlayers: 2,
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "7",
      name: "房間7",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "1",
        nickname: "王小明",
      },
      minPlayers: 1,
      maxPlayers: 7,
      isLock: false,
    },
    {
      id: "8",
      name: "房間8",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "2",
        nickname: "林小華",
      },
      minPlayers: 2,
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "9",
      name: "房間9",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "3",
        nickname: "陳小明",
      },
      minPlayers: 3,
      maxPlayers: 5,
      isLock: false,
    },
    {
      id: "10",
      name: "房間10",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "4",
        nickname: "張小華",
      },
      minPlayers: 2,
      maxPlayers: 6,
      isLock: true,
    },
    {
      id: "11",
      name: "房間11",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "5",
        nickname: "吳小明",
      },
      minPlayers: 1,
      maxPlayers: 8,
      isLock: false,
    },
    {
      id: "12",
      name: "房間12",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "6",
        nickname: "劉小華",
      },
      minPlayers: 2,
      maxPlayers: 4,
      isLock: true,
    },
  ],
  meta: {
    pageTimestamp: "2022-11-01T00:00:00.000Z",
    limit: 1,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // console.log("SERVER GET request!!!!!!!!");
  if (req.method === "GET") {
    const { status } = req.query;
    if (status === "WAITING") {
      return res.json(waitingData);
    }
  } else {
    throw new Error("Invalid method");
  }
}
