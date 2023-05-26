export type Game = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  nickname: string;
  isReady: boolean;
};

export type RoomInfoType = {
  id: string;
  name: string;
  status: "WATTING" | "PLAYING";
  game: Game;
  host: User;
  isLocked: boolean;
  players: User[];
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
};

export const enum REDUCER_ACTION_TYPE {
  INITIALIZE_ROOM,
  ADD_PLAYER,
  REMOVE_PLAYER,
  UPDATE_HOST,
  UPDATE_ROOM_STATUS,
  TOGGLE_USER_READY_STATUS,
  CLEAN_ROOM,
}

export type Initialize_ROOMAction = {
  type: REDUCER_ACTION_TYPE.INITIALIZE_ROOM;
  payload: RoomInfoType;
};

export type AddPlayerAction = {
  type: REDUCER_ACTION_TYPE.ADD_PLAYER;
  payload: Omit<User, "isReady">;
};

export type RemovePlayerAction = {
  type: REDUCER_ACTION_TYPE.REMOVE_PLAYER;
  payload: Pick<User, "id">;
};

export type UpdateHostAction = {
  type: REDUCER_ACTION_TYPE.UPDATE_HOST;
  payload: Pick<User, "id">;
};

export type UpdateRoomStatus = {
  type: REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS;
  payload: Pick<RoomInfoType, "status">;
};

export type UpdateUserReadyStatus = {
  type: REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS;
  payload: Pick<User, "id">;
};

export type CleanRoomAction = {
  type: REDUCER_ACTION_TYPE.CLEAN_ROOM;
};

export type ReducerAction =
  | Initialize_ROOMAction
  | AddPlayerAction
  | RemovePlayerAction
  | UpdateHostAction
  | UpdateRoomStatus
  | UpdateUserReadyStatus
  | CleanRoomAction;
