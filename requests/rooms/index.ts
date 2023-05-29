import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type CreateRoomDataType = {
  name: string;
  gameId: string;
  password: number | null | "";
  minPlayers: number;
  maxPlayers: number;
};

export type CreateRoomResponseType = {
  id: string;
  name: string;
  game: {
    id: string;
    name: string;
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

export namespace Room {
  export type Game = {
    id: string;
    name: string;
  };

  export type User = {
    id: string;
    nickname: string;
    isReady: boolean;
  };
  export type Infomation = {
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
): IRequestWrapper<CreateRoomResponseType> => {
  return requestWrapper({
    url: "/api/internal/rooms",
    method: "POST",
    data,
  });
};

export const getRoomInfoEndpoint = (
  roomId: string
): IRequestWrapper<Room.Infomation> => {
  return requestWrapper({
    url: `/api/internal/rooms/${roomId}`,
    method: "GET",
  });
};
