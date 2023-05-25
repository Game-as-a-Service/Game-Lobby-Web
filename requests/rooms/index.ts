import { IRequestWrapper, requestWrapper } from "@/requests/request";

export interface createRoomData {
  name: string;
  gameId: string;
  password: number | null | "";
  minPlayers: number;
  maxPlayers: number;
}

export const createRoomEndpoint = (
  data: createRoomData
): IRequestWrapper<{ url: string }> => {
  return requestWrapper({
    url: "/api/internal/rooms",
    method: "POST",
    data,
  });
};
