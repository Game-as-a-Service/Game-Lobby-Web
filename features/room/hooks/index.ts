/**
 * Rooms SWR Hooks
 */

import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import {
  roomsApi,
  roomKeys,
  type Room,
  type User,
  type CreateRoomRequest,
  type JoinRoomRequest,
  type RoomListQuery,
  type PaginatedResponse,
} from "@/api";
import { useAuth } from "@/contexts/auth";

// ========================
// SWR Hooks
// ========================

/**
 * 獲取房間列表
 */
export const useRooms = (query?: RoomListQuery) => {
  const { token } = useAuth();

  return useSWR<PaginatedResponse<Room>>(token ? roomKeys.list(query) : null, {
    revalidateOnFocus: false,
  });
};

/**
 * 獲取房間詳情
 */
export const useRoom = (roomId: string | null) => {
  const { token } = useAuth();

  return useSWR<Room>(token && roomId ? roomKeys.detail(roomId) : null, {
    revalidateOnFocus: false,
  });
};

/**
 * 獲取房間玩家列表
 */
export const useRoomPlayers = (roomId: string | null) => {
  const { token } = useAuth();

  return useSWR<User[]>(token && roomId ? roomKeys.players(roomId) : null, {
    revalidateOnFocus: false,
  });
};

// ========================
// Mutation Hooks
// ========================

/**
 * 創建房間
 */
export const useCreateRoom = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "createRoom",
    async (_key: string, { arg }: { arg: CreateRoomRequest }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.createRoom(token, arg);
    },
    {
      onSuccess: () => {
        // 刷新房間列表
        mutate(
          (key) => Array.isArray(key) && key[0] === "rooms" && key[1] === "list"
        );
      },
    }
  );
};

/**
 * 加入房間
 */
export const useJoinRoom = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "joinRoom",
    async (
      _key: string,
      { arg }: { arg: { roomId: string; data?: JoinRoomRequest } }
    ) => {
      if (!token) throw new Error("No token available");
      return roomsApi.joinRoom(token, arg.roomId, arg.data);
    }
  );
};

/**
 * 離開房間
 */
export const useLeaveRoom = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "leaveRoom",
    async (_key: string, { arg }: { arg: { roomId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.leaveRoom(token, arg.roomId);
    }
  );
};

/**
 * 踢出玩家
 */
export const useKickPlayer = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "kickPlayer",
    async (
      _key: string,
      { arg }: { arg: { roomId: string; userId: string } }
    ) => {
      if (!token) throw new Error("No token available");
      return roomsApi.kickPlayer(token, arg.roomId, arg.userId);
    }
  );
};

/**
 * 關閉房間
 */
export const useCloseRoom = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "closeRoom",
    async (_key: string, { arg }: { arg: { roomId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.closeRoom(token, arg.roomId);
    },
    {
      onSuccess: () => {
        // 刷新房間列表
        mutate(
          (key) => Array.isArray(key) && key[0] === "rooms" && key[1] === "list"
        );
      },
    }
  );
};

/**
 * 玩家準備
 */
export const usePlayerReady = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "playerReady",
    async (_key: string, { arg }: { arg: { roomId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.playerReady(token, arg.roomId);
    }
  );
};

/**
 * 玩家取消準備
 */
export const usePlayerCancelReady = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "playerCancelReady",
    async (_key: string, { arg }: { arg: { roomId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.playerCancelReady(token, arg.roomId);
    }
  );
};

/**
 * 開始遊戲
 */
export const useStartGame = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "startGame",
    async (_key: string, { arg }: { arg: { roomId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.startGame(token, arg.roomId);
    }
  );
};
