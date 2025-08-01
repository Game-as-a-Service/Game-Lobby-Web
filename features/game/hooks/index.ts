/**
 * Games Hooks
 */

import { useState, useCallback, useEffect } from "react";
import { gamesApi, roomsApi, type GameRegistration } from "@/api";
import { useAuth } from "@/contexts/auth";

/**
 * 獲取遊戲列表
 */
export const useGames = () => {
  const [data, setData] = useState<GameRegistration[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await gamesApi.getGameRegistrations();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  return {
    data,
    error,
    isLoading,
    refetch: fetchGames,
  };
};

/**
 * 獲取遊戲詳情
 */
export const useGame = (gameId: string | null) => {
  const [data, setData] = useState<GameRegistration | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!!gameId);

  const fetchGame = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      // Note: 根據目前的 API，沒有單一遊戲的端點，這裡需要調整
      const games = await gamesApi.getGameRegistrations();
      const game = games.find((g) => g.id === id);
      setData(game || null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (gameId) {
      fetchGame(gameId);
    } else {
      setData(null);
      setIsLoading(false);
    }
  }, [gameId, fetchGame]);

  return {
    data,
    error,
    isLoading,
    refetch: gameId ? () => fetchGame(gameId) : undefined,
  };
};

/**
 * 快速加入遊戲
 */
export const useFastJoinGame = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fastJoinGame = useCallback(
    async (gameId: string) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const result = await roomsApi.fastJoinRoom(token, { gameId });
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
    fastJoinGame,
    isLoading,
    error,
  };
};
