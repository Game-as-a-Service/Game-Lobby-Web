import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type CreateRoomDataType = {
  name: string;
  gameId: string;
  password: number | null | "";
  minPlayers: number;
  maxPlayers: number;
};

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
  isLocked: boolean;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
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

export namespace RoomInfo {
  export type Game = {
    id: string;
    name: string;
  };

  export type User = {
    id: string;
    nickname: string;
    isReady: boolean;
  };

  export type Room = {
    id: string;
    name: string;
    status: "WATTING" | "PLAYING";
    game: Game;
    host: User;
    isLocked: boolean;
    players: User[];
    currentPlayers: number;
    minPlayers: number;
    maxPlayers: number;
  };
}

export const createRoomEndpoint = (
  data: CreateRoomDataType
): IRequestWrapper<Room> => {
  return requestWrapper({
    url: "/api/internal/rooms",
    method: "POST",
    data,
  });
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

export const getRoomInfoEndpoint = (
  roomId: string
): IRequestWrapper<RoomInfo.Room> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}`,
    method: "GET",
  });
};
