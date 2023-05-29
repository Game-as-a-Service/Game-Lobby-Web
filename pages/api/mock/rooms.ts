import type { NextApiRequest, NextApiResponse } from "next";
import { mock_createRoomResponse } from "@/mocks/rooms";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json(mock_createRoomResponse);
}
