import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const userId = req.query.userId;
    const roomId = req.query.roomId;
    if (roomId && userId && userId !== "me") {
      return res.end();
    }
  }
}
