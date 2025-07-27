/**
 * Rooms API module
 */

import {
  fetcher,
  formatQueryParams,
  createAuthenticatedFetcher,
} from "../fetcher";
import type {
  Room,
  GetRoomsQuery,
  GetRoomsResponse,
  CreateRoomRequest,
  JoinRoomRequest,
  FastJoinRoomRequest,
  FastJoinRoomResponse,
  StartGameResponse,
} from "./type";

export const roomsApi = {
  /**
   * GET /rooms
   */
  getRooms: async (query: GetRoomsQuery): Promise<GetRoomsResponse> => {
    const queryString = formatQueryParams(query);
    return fetcher<GetRoomsResponse>(`/rooms?${queryString}`);
  },

  /**
   * POST /rooms
   */
  createRoom: async (
    token: string,
    data: CreateRoomRequest
  ): Promise<object> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<object>("/rooms", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * POST /rooms:fastJoin
   */
  fastJoinRoom: async (
    token: string,
    data: FastJoinRoomRequest
  ): Promise<FastJoinRoomResponse> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<FastJoinRoomResponse>("/rooms:fastJoin", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * GET /rooms/{roomId}
   */
  getRoomDetail: async (token: string, roomId: string): Promise<Room> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<Room>(`/rooms/${roomId}`);
  },

  /**
   * DELETE /rooms/{roomId}
   */
  closeRoom: async (token: string, roomId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  },

  /**
   * POST /rooms/{roomId}:startGame
   */
  startGame: async (
    token: string,
    roomId: string
  ): Promise<StartGameResponse> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<StartGameResponse>(`/rooms/${roomId}:startGame`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  /**
   * POST /rooms/{roomId}:endGame
   */
  endGame: async (token: string, roomId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}:endGame`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  /**
   * POST /rooms/{roomId}/players
   */
  joinRoom: async (
    token: string,
    roomId: string,
    data?: JoinRoomRequest
  ): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}/players`, {
      method: "POST",
      body: JSON.stringify(data || {}),
    });
  },

  /**
   * DELETE /rooms/{roomId}/players/me
   */
  leaveRoom: async (token: string, roomId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}/players/me`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  },

  /**
   * DELETE /rooms/{roomId}/players/{playerId}
   */
  kickPlayer: async (
    token: string,
    roomId: string,
    playerId: string
  ): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}/players/${playerId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  },

  /**
   * POST /rooms/{roomId}/players/me:ready
   */
  playerReady: async (token: string, roomId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}/players/me:ready`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  /**
   * POST /rooms/{roomId}/players/me:cancel
   */
  playerCancelReady: async (token: string, roomId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/rooms/${roomId}/players/me:cancel`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },
};
