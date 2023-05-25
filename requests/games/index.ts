import { IRequestWrapper, requestWrapper } from "@/requests/request";

export const getAllGamesEndpoint = (): IRequestWrapper<{ url: string }> => {
  return requestWrapper({
    url: "/api/internal/games",
    method: "GET",
  });
};
