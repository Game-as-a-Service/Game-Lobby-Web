/**
 * Rooms Hooks
 */

import { useState, useCallback, useEffect } from "react";
import {
  roomsApi,
  type Room,
  type User,
  type CreateRoomRequest,
  type JoinRoomRequest,
  type GetRoomsQuery,
  type GetRoomsResponse,
} from "@/api";
import { useAuth } from "@/contexts/auth";

/**
 * 獲取房間列表
 */
export const useRooms = (query?: GetRoomsQuery) => {
  const { token } = useAuth();
  const [data, setData] = useState<GetRoomsResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!!token);

  const fetchRooms = useCallback(
    async (searchQuery?: GetRoomsQuery) => {
      if (!token) return;

      try {
        setIsLoading(true);
        setError(null);
        const queryWithDefaults: GetRoomsQuery = {
          status: "ready",
          page: 1,
          perPage: 10,
          ...searchQuery,
        };
        const result = await roomsApi.getRooms(queryWithDefaults);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (token) {
      fetchRooms(query);
    } else {
      setData(null);
      setIsLoading(false);
    }
  }, [token, query, fetchRooms]);

  return {
    data,
    error,
    isLoading,
    refetch: () => fetchRooms(query),
  };
};

/**
 * 獲取房間詳情
 */
export const useRoom = (roomId: string | null) => {
  const { token } = useAuth();
  const [data, setData] = useState<Room | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!!token && !!roomId);

  const fetchRoom = useCallback(async (id: string, authToken: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await roomsApi.getRoomDetail(authToken, id);
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token && roomId) {
      fetchRoom(roomId, token);
    } else {
      setData(null);
      setIsLoading(false);
    }
  }, [token, roomId, fetchRoom]);

  return {
    data,
    error,
    isLoading,
    refetch: token && roomId ? () => fetchRoom(roomId, token) : undefined,
  };
};

/**
 * 獲取房間玩家列表
 * Note: 目前 API 沒有獨立的玩家列表端點，需要從房間詳情中獲取
 */
export const useRoomPlayers = (roomId: string | null) => {
  const { data: room, error, isLoading } = useRoom(roomId);

  return {
    data: room?.players || null,
    error,
    isLoading,
  };
};

/**
 * 創建房間
 */
export const useCreateRoom = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createRoom = useCallback(
    async (data: CreateRoomRequest) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.createRoom(token, data);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    createRoom,
    isLoading,
    error,
  };
};

/**
 * 加入房間
 */
export const useJoinRoom = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const joinRoom = useCallback(
    async (roomId: string, data?: JoinRoomRequest) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.joinRoom(token, roomId, data);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    joinRoom,
    isLoading,
    error,
  };
};

/**
 * 離開房間
 */
export const useLeaveRoom = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const leaveRoom = useCallback(
    async (roomId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.leaveRoom(token, roomId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    leaveRoom,
    isLoading,
    error,
  };
};

/**
 * 踢出玩家
 */
export const useKickPlayer = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const kickPlayer = useCallback(
    async (roomId: string, userId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.kickPlayer(token, roomId, userId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    kickPlayer,
    isLoading,
    error,
  };
};

/**
 * 關閉房間
 */
export const useCloseRoom = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const closeRoom = useCallback(
    async (roomId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.closeRoom(token, roomId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    closeRoom,
    isLoading,
    error,
  };
};

/**
 * 玩家準備
 */
export const usePlayerReady = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const playerReady = useCallback(
    async (roomId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.playerReady(token, roomId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    playerReady,
    isLoading,
    error,
  };
};

/**
 * 玩家取消準備
 */
export const usePlayerCancelReady = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const playerCancelReady = useCallback(
    async (roomId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.playerCancelReady(token, roomId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    playerCancelReady,
    isLoading,
    error,
  };
};

/**
 * 開始遊戲
 */
export const useStartGame = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const startGame = useCallback(
    async (roomId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.startGame(token, roomId);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token]
  );

  return {
    startGame,
    isLoading,
    error,
  };
};
