import type { NextApiRequest, NextApiResponse } from "next";
import { mock_rooms, mock_createRoomResponse } from "@/mocks/room";
import type { Rooms, Room } from "@/requests/rooms";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Rooms | Room>
) {
  if (req.method === "GET") {
    const { page: reqPage = 1, perPage = 10 } = req.query;
    const rooms = mock_rooms();

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
  } else if (req.method === "POST") {
    return res.json(mock_createRoomResponse);
  }

  throw new Error("Invalid method!");
}
