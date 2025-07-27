/**
 * Users API module
 */

import { createAuthenticatedFetcher } from "../fetcher";
import type {
  CreateUserRequest,
  UpdateUserRequest,
  GetUserResponse,
  UpdateUserResponse,
} from "./type";

export const usersApi = {
  /**
   * GET /users/me
   */
  getCurrentUser: async (token: string): Promise<GetUserResponse> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<GetUserResponse>("/users/me");
  },

  /**
   * PUT /users/me
   */
  updateCurrentUser: async (
    token: string,
    data: UpdateUserRequest
  ): Promise<UpdateUserResponse> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<UpdateUserResponse>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * POST /users
   */
  createUser: async (token: string, data: CreateUserRequest): Promise<void> => {
    const authFetch = createAuthenticatedFetcher(token);
    return authFetch<void>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
