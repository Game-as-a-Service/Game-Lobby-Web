import type { NextApiRequest, NextApiResponse } from "next";
interface Game {
  id: string;
  name: string;
}

interface User {
  id: string;
  nickname: string;
}

export interface CreateRoomResponseType {
  id: string;
  name: string;
  game: Game;
  host: User;
  isLocked: boolean;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    id: "3345678",
    name: "roomName",
    game: {
      id: "1",
      name: "wolfKiller",
    },
    host: {
      id: "abc",
      nickname: "哈",
    },
    isLocked: false,
    currentPlayers: 1,
    minPlayers: 2,
    maxPlayers: 6,
  });
}
