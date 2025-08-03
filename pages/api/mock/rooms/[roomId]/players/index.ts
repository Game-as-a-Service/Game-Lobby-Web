import type { NextApiRequest, NextApiResponse } from "next";
import { wait } from "@/lib/utils";
import { mock_rooms } from "@/mocks/room";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { roomId } = req.query;
    const data = mock_rooms("WAITING").find((room) => room.id === roomId);

    await wait(800);

    if (data?.isLocked && req.body.password !== "1234") {
      return res.status(400).json({ message: "wrong password" });
    }

    return res.json({ message: "success" });
  }
}
