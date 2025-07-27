/**
 * SWR Cache Keys management
 */

// ========================
// Auth Keys
// ========================

export const authKeys = {
  all: ["auth"] as const,
  login: (type: string) => ["auth", "login", type] as const,
  token: () => ["auth", "token"] as const,
  authenticate: () => ["auth", "authenticate"] as const,
};

// ========================
// User Keys
// ========================

export const userKeys = {
  all: ["users"] as const,
  current: () => ["users", "current"] as const,
  profile: (userId: string) => ["users", "profile", userId] as const,
};

// ========================
// Game Keys
// ========================

export const gameKeys = {
  all: ["games"] as const,
  list: () => ["games", "list"] as const,
  detail: (gameId: string) => ["games", "detail", gameId] as const,
};

// ========================
// Room Keys
// ========================

interface RoomListQuery {
  status?: string;
  public?: boolean;
  keyword?: string;
  page?: number;
  perPage?: number;
}

const createKey = (base: readonly string[], params?: any) => {
  return params ? ([...base, params] as const) : base;
};

export const roomKeys = {
  all: ["rooms"] as const,
  list: (query?: RoomListQuery) => createKey(["rooms", "list"], query),
  detail: (roomId: string) => ["rooms", "detail", roomId] as const,
  players: (roomId: string) => ["rooms", "players", roomId] as const,
};
