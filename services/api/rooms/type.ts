/**
 * Rooms module type definitions
 */

import type { Game } from "../games/type";

export interface Player {
  id: string;
  nickname: string;
}

export interface Room {
  id: string;
  name: string;
  game: Game;
  host: Player;
  players?: Player[];
  maxPlayers: number;
  minPlayers: number;
  currentPlayers: number;
  isLocked: boolean;
  status?: string;
}

export interface Page {
  total: number;
  page: number;
  perPage: number;
}

export interface GetRoomsQuery {
  status: string;
  public?: boolean;
  keyword?: string;
  page: number;
  perPage: number;
}

export interface GetRoomsResponse {
  rooms: Room[];
  page: Page;
}

export interface CreateRoomRequest {
  name: string;
  gameId: string;
  password?: string;
  maxPlayers: number;
  minPlayers: number;
}

export interface JoinRoomRequest {
  password?: string;
}

export interface FastJoinRoomRequest {
  gameId: string;
}

export interface FastJoinRoomResponse {
  roomId: string;
}

export interface StartGameResponse {
  url: string;
}

// Additional types for compatibility
export type RoomStatus = "WAITING" | "PLAYING" | "CLOSED";

export interface RoomListQuery {
  status?: string;
  public?: boolean;
  keyword?: string;
  page?: number;
  perPage?: number;
}
