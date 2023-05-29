import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type GameType = {
  id: string;
  displayName: string;
  imageUrl: string;
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
