/**
 * Auth API module
 */

import { fetcher, formatQueryParams } from "../fetcher";
import type {
  LoginRequest,
  LoginResponse,
  AuthenticateRequest,
  AuthenticateResponse,
} from "./type";

export const authApi = {
  /**
   * GET /login
   */
  login: async (params: LoginRequest): Promise<LoginResponse> => {
    const queryString = formatQueryParams({ type: params.type });
    return fetcher<LoginResponse>(`/login?${queryString}`);
  },

  /**
   * Alias for login function
   */
  getLoginUrl: async (params: LoginRequest): Promise<LoginResponse> => {
    return authApi.login(params);
  },

  /**
   * POST /authenticate
   */
  authenticate: async (
    data: AuthenticateRequest
  ): Promise<AuthenticateResponse> => {
    return fetcher<AuthenticateResponse>("/authenticate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Development only - not in Swagger
   */
  getMockToken: async (): Promise<AuthenticateResponse> => {
    return fetcher<AuthenticateResponse>("/token", {
      method: "POST",
    });
  },
};
