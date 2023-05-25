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
    id: "roomid",
    name: "roomName",
    game: {
      id: "gameId",
      name: "gameName",
    },
    host: {
      id: "userId",
      nickname: "userName",
    },
    isLocked: false,
    currentPlayers: 1,
    minPlayers: 2,
    maxPlayers: 6,
  });
}
