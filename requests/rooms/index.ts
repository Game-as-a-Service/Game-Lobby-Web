import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type CreateRoomFormType = {
  name: string;
  gameId: string;
  password: null | string;
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

export type RoomEntry = {
  message: string;
};

export const createRoomEndpoint = (
  data: CreateRoomFormType
): IRequestWrapper<Room> => {
  return requestWrapper({
    url: "/api/internal/rooms",
    method: "POST",
    data,
  });
};

export enum RoomType {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
}

export const getRooms = (data: {
  page?: number;
  perPage?: number;
  status: RoomType;
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

export const postRoomEntry = (
  roomId: string,
  password: null | string
): IRequestWrapper<RoomEntry> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}/players`,
    method: "POST",
    data: { password },
  });
};

export const kickUser = ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}): IRequestWrapper<null> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}/players/${userId}`,
    method: "DELETE",
  });
};

export const closeRoom = (roomId: string): IRequestWrapper<null> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}`,
    method: "DELETE",
  });
};

export const leaveRoom = (roomId: string): IRequestWrapper<null> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}/players/me`,
    method: "DELETE",
  })
};
export const playerReady = (
  roomId: string
): IRequestWrapper<{ message: string }> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}/players/me:ready`,
    method: "POST",
  });
};

export const playerCancelReady = (
  roomId: string
): IRequestWrapper<{ message: string }> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}/players/me:cancel`,
    method: "POST",
  });
};
