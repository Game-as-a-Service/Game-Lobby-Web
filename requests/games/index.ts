import { IRequestWrapper, requestWrapper } from "@/requests/request";

export type GameType = {
  id: string;
  name: string;
  img: string;
  minPlayers: number;
  maxPlayers: number;
  category?: string;
};

export type GameListType = {
  id: string;
  name: string;
  imgUrl: string;
  rating: number;
  price: string | number;
  category?: string[];
};

export type PageMeta = {
  page: number;
  perPage: number;
  total: number;
};

export type Games = {
  data: GameListType[];
  page: PageMeta;
};

export const getAllGamesEndpoint = (): IRequestWrapper<GameType[]> => {
  return requestWrapper({
    url: "/api/internal/games",
    method: "GET",
  });
};

export const getLobbyGames = (data: {
  page?: number;
  perPage?: number;
}): IRequestWrapper<Games> => {
  return requestWrapper({
    url: "/api/internal/lobby-games",
    method: "GET",
    params: data,
  });
};
