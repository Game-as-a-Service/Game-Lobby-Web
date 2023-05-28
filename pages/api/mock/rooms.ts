import type { NextApiRequest, NextApiResponse } from "next";

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
