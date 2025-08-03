import type { NextApiRequest, NextApiResponse } from "next";
import { mock_rooms, mock_createRoomResponse } from "@/mocks/room";
import {
  GetRoomsViewModel as GetRoomsResponse,
  RoomViewModel as Room,
} from "@/services/api";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetRoomsResponse | Room>
) {
  if (req.method === "GET") {
    const { page: reqPage = 1, perPage = 10, status } = req.query;
    const roomType = (status as "PLAYING" | "WAITING") || "WAITING";
    const rooms = mock_rooms(roomType);

    const pageOpt = {
      page: Number(reqPage),
      perPage: Number(perPage),
      total: 100,
    };

    const data = rooms.slice(
      Number(reqPage) * Number(perPage),
      Number(reqPage) + 1 * Number(perPage)
    );

    return res.json({ rooms: data, page: pageOpt });
  } else if (req.method === "POST") {
    return res.json(mock_createRoomResponse);
  }

  throw new Error("Invalid method!");
}
