import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type Room = {
  id: string;
  name: string;
  game: {
    id: string;
    name: string;
    imgUrl: string;
  };
  host: {
    id: string;
    nickname: string;
  };
  minPlayers: number;
  maxPlayers: number;
  isLock: boolean;
};

export type Rooms = {
  rooms: Room[];
  meta: {
    pageTimestamp: string;
    limit: number;
  };
};

// 這個 API 需要參數嗎
// 怎麼傳？
// GET /api/internal/rooms?abc=WAITING
export const getRoomsEndpoint = (data: {
  status: "WAITING" | "PLAYING";
  offset: number;
  limit: number;
}): IRequestWrapper<Rooms> => {
  const { status, offset, limit } = data;
  return requestWrapper({
    url: `/api/internal/rooms?status=${status}&offset=${offset}&limit=${limit}`,
    method: "GET",
  });
};
