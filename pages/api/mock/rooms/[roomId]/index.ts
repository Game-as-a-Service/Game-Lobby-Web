import type { NextApiRequest, NextApiResponse } from "next";
import { mock_roomInfo } from "@/mocks/room";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.json(mock_roomInfo);
  if (req.method === "DELETE") return res.status(204).json({});

  if (req.method === "POST") {
    if (req.query.roomId?.includes("startGame")) {
      return res
        .status(200)
        .json({ gameUrl: "https://big2.game.com/aoi3987234/" });
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  }
}
