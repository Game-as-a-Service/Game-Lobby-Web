import { IRequestWrapper, requestWrapper } from "../request";

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
  currentPlayers: number;
};

export type PageMeta = {
  page: number;
  perPage: number;
  total: number;
};

export type PageData<T> = {
  data: T[];
  page: PageMeta;
};

export type Rooms = {
  data: Room[];
  page: PageMeta;
};

export const getRooms = (data: {
  page?: number;
  perPage?: number;
}): IRequestWrapper<Rooms> => {
  return requestWrapper({
    url: "/api/internal/rooms",
    method: "GET",
    params: data,
  });
};
