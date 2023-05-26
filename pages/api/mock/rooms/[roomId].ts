import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET")
    return res.json({
      id: "3345678",
      name: "銀河路跑-1",
      status: "WATTING",
      game: { id: "1", name: "wolfKiller" },
      host: { id: "abc", nickname: "房間創建者", isReady: false },
      isLocked: false,
      players: [{ id: "abc", nickname: "房間創建者", isReady: false }],
      currentPlayers: 1,
      minPlayers: 2,
      maxPlayers: 5,
    });
}
