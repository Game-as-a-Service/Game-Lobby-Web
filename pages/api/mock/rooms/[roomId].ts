import type { NextApiRequest, NextApiResponse } from "next";
import { mock_roomInfo } from "@/mocks/rooms";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") return res.json(mock_roomInfo);
}
