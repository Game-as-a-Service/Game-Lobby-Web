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
      name: "Dreadhead Parkour",
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
      name: "Stacktris",
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
      name: "Chicken Merge",
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
      name: "Clash Of Armour",
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
      name: "Clash of Skulls",
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
      name: "Clash of Skulls",
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
      name: "Viking Village",
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
      name: "Barbershop Inc.",
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
      name: "Barbershop Inc.",
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
      name: "Sushi Party",
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
      name: "Smash Karts",
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
      name: "EvoWorld io (FlyOrDie io)",
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

const playingData = {
  rooms: [
    {
      id: "111",
      name: "Anycolor by Numbers",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "1",
        nickname: "王小明",
      },
      minPlayers: 3,
      maxPlayers: 7,
      isLock: false,
    },
    {
      id: "112",
      name: "Cat Room Blast",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "2",
        nickname: "林小華",
      },
      minPlayers: 4,
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "113",
      name: "Game of Farmers",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "3",
        nickname: "陳小明",
      },
      minPlayers: 5,
      maxPlayers: 5,
      isLock: false,
    },
    {
      id: "114",
      name: "Castle Woodwarf",
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
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "115",
      name: "Tower Crush",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "5",
        nickname: "吳小明",
      },
      minPlayers: 3,
      maxPlayers: 3,
      isLock: false,
    },
    {
      id: "116",
      name: "Battle Forces",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "6",
        nickname: "劉小華",
      },
      minPlayers: 4,
      maxPlayers: 4,
      isLock: true,
    },
    {
      id: "117",
      name: "Funny Haircut",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "1",
        nickname: "王小明",
      },
      minPlayers: 5,
      maxPlayers: 5,
      isLock: false,
    },
    {
      id: "118",
      name: "Funny Kitty Haircut",
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
      maxPlayers: 2,
      isLock: true,
    },
    {
      id: "119",
      name: "Funny Kitty Haircut",
      game: {
        id: "1",
        name: "好玩的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "3",
        nickname: "陳小明",
      },
      minPlayers: 5,
      maxPlayers: 5,
      isLock: false,
    },
    {
      id: "120",
      name: "Subway Surfers",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "4",
        nickname: "張小華",
      },
      minPlayers: 6,
      maxPlayers: 6,
      isLock: true,
    },
    {
      id: "121",
      name: "Jumping Shell",
      game: {
        id: "2",
        name: "另一個遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "5",
        nickname: "吳小明",
      },
      minPlayers: 4,
      maxPlayers: 4,
      isLock: false,
    },
    {
      id: "122",
      name: "Monkey Mart",
      game: {
        id: "3",
        name: "有趣的遊戲",
        imgUrl: "http://localhost:3030/images/game-avatar.jpg",
      },
      host: {
        id: "6",
        nickname: "劉小華",
      },
      minPlayers: 7,
      maxPlayers: 7,
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
    const { status, offset, limit } = req.query;
    if (status === "WAITING") {
      return res.json({
        rooms: waitingData.rooms.slice(Number(offset), Number(limit)),
        meta: waitingData.meta,
      });
      // 顯示沒有房間的測試
      // return res.json({ rooms: [], meta: {} });
    }
    if (status === "PLAYING") {
      return res.json({
        rooms: playingData.rooms.slice(Number(offset), Number(limit)),
        meta: playingData.meta,
      });
    }
  } else {
    throw new Error("Invalid method");
  }
}
