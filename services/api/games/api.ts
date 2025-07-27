/**
 * Games API module
 */

import {
  fetcher,
  formatQueryParams,
  createAuthenticatedFetcher,
} from "../fetcher";
import type {
  Game,
  GameRegistration,
  RegisterGameRequest,
  UpdateGameRegistrationRequest,
  CommentGameRequest,
  UpdateGameCommentRequest,
  FindGameRegistrationsQuery,
} from "./type";

export const gamesApi = {
  /**
   * GET /games
   */
  getGameRegistrations: async (
    query?: FindGameRegistrationsQuery
  ): Promise<GameRegistration[]> => {
    const queryString = query ? formatQueryParams(query) : "";
    const url = queryString ? `/games?${queryString}` : "/games";
    return fetcher<GameRegistration[]>(url);
  },

  /**
   * POST /games
   */
  registerGame: async (data: RegisterGameRequest): Promise<object> => {
    return fetcher<object>("/games", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * PUT /games/{gameId}
   */
  updateGameRegistration: async (
    gameId: string,
    data: UpdateGameRegistrationRequest
  ): Promise<GameRegistration> => {
    return fetcher<GameRegistration>(`/games/${gameId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * POST /comments
   */
  commentGame: async (
    token: string,
    data: CommentGameRequest
  ): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>("/comments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * POST /comments/games/{gameId}
   */
  updateGameComment: async (
    token: string,
    gameId: string,
    data: UpdateGameCommentRequest
  ): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/comments/games/${gameId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * POST /collections/games/{gameId}
   */
  collectGame: async (token: string, gameId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/collections/games/${gameId}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  },

  /**
   * DELETE /collections/games/{gameId}
   */
  unCollectGame: async (token: string, gameId: string): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>(`/collections/games/${gameId}`, {
      method: "DELETE",
      body: JSON.stringify({}),
    });
  },

  /**
   * GET /collections
   */
  getGameCollections: async (token: string): Promise<GameRegistration[]> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<GameRegistration[]>("/collections");
  },
};
