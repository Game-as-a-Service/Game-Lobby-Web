/**
 * Users module type definitions
 */

export interface User {
  id: string;
  email: string;
  nickname: string;
  lastPlayedGameId?: string;
  playedGamesIds?: string[];
  currentGameRoomId?: string;
  currentGameUrl?: string;
}

export interface CreateUserRequest {
  email: string;
}

export interface UpdateUserRequest {
  nickname: string;
}

export interface GetUserResponse {
  id: string;
  email: string;
  nickname: string;
  lastPlayedGameId?: string;
  playedGamesIds?: string[];
  currentGameRoomId?: string;
  currentGameUrl?: string;
}

export interface UpdateUserResponse {
  id: string;
  email: string;
  nickname: string;
}
