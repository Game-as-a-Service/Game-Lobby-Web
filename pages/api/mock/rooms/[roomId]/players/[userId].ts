import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const userId = req.query.userId;
    const roomId = req.query.roomId;
    // 關閉房間
    if (roomId && userId && userId !== "me") {
      return res.status(204).json({});
    }

    // 離開房間
    if (roomId && userId && userId === "me") {
      return res.status(204).json({});
    }
  }

  if (req.method === "POST") {
    const userId = req.query.userId;
    const roomId = req.query.roomId;
    if (roomId && userId === "me:ready") {
      return res.json({ message: "Success" });
    }

    if (roomId && userId === "me:cancel") {
      return res.json({ message: "Success" });
    }
  }
}
