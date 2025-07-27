/**
 * Games SWR Hooks
 */

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { gamesApi, roomsApi, gameKeys, type Game } from "@/api";
import { useAuth } from "@/contexts/auth";

// ========================
// SWR Hooks
// ========================

/**
 * 獲取遊戲列表
 */
export const useGames = () => {
  return useSWR<Game[]>(gameKeys.list(), {
    revalidateOnFocus: false,
  });
};

/**
 * 獲取遊戲詳情
 */
export const useGame = (gameId: string | null) => {
  return useSWR<Game>(gameId ? gameKeys.detail(gameId) : null, {
    revalidateOnFocus: false,
  });
};

// ========================
// Mutation Hooks
// ========================

/**
 * 快速加入遊戲
 */
export const useFastJoinGame = () => {
  const { token } = useAuth();

  return useSWRMutation(
    "fastJoinGame",
    async (_key: string, { arg }: { arg: { gameId: string } }) => {
      if (!token) throw new Error("No token available");
      return roomsApi.fastJoinRoom(token, { gameId: arg.gameId });
    }
  );
};
