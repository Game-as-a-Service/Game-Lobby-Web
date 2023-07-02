import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type GameType = {
  id: string;
  name: string;
  img: string;
  minPlayers: number;
  maxPlayers: number;
  category?: string;
};

export const getAllGamesEndpoint = (): IRequestWrapper<GameType[]> => {
  return requestWrapper({
    url: "/api/internal/games",
    method: "GET",
  });
};
