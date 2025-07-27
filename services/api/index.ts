/**
 * API unified entry point
 */

export * from "./fetcher";
export * from "./keys";
export * from "./auth";
export * from "./users";
export * from "./games";
export * from "./rooms";

export { authApi } from "./auth/api";
export { usersApi } from "./users/api";
export { gamesApi } from "./games/api";
export { roomsApi } from "./rooms/api";
