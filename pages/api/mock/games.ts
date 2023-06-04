import type { NextApiRequest, NextApiResponse } from "next";
import { mock_getGameList } from "@/mocks/games";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json(mock_getGameList(10));
}
