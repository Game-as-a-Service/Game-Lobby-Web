import type { NextApiRequest, NextApiResponse } from "next";

import { mock_rooms } from "@/mocks/room";
import { Rooms, RoomType } from "@/requests/rooms";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rooms>
) {
  if (req.method === "GET") {
    const { page: reqPage = 1, perPage = 10, status } = req.query;
    const roomType = (status as RoomType) || RoomType.WAITING;
    const rooms = mock_rooms(roomType);

    const pageOpt = {
      page: Number(reqPage),
      perPage: Number(perPage),
      total: 100,
    };

    const data = rooms.slice(
      (Number(reqPage) - 1) * Number(perPage),
      Number(reqPage) * Number(perPage)
    );

    return res.json({ data, page: pageOpt });
  }

  throw new Error("Invalid method!");
}
