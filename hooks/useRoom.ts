import { useState, useEffect, useCallback } from "react";
import { Room, Player, User } from "@/api";
import useCookie from "./useCookie";

export type RoomState = Room;

const useRoom = (init?: RoomState) => {
  const [room, setRoom] = useState<RoomState | undefined>(init);
  const { roomIdOperator, gameUrlOperator } = useCookie();

  // Room cookie operations
  const getRoomId = useCallback(() => {
    return roomIdOperator.get();
  }, [roomIdOperator]);

  const updateRoomId = useCallback(
    (roomId?: string) => {
      if (roomId) {
        roomIdOperator.set(roomId);
      } else {
        roomIdOperator.remove();
      }
    },
    [roomIdOperator]
  );

  // Game URL cookie operations
  const getGameUrl = useCallback(() => {
    return gameUrlOperator.get() || "";
  }, [gameUrlOperator]);

  const updateGameUrl = useCallback(
    (gameUrl?: string) => {
      if (gameUrl) {
        gameUrlOperator.set(gameUrl);
      } else {
        gameUrlOperator.remove();
      }
    },
    [gameUrlOperator]
  );

  return {
    room,
    setRoom,
    getRoomId,
    updateRoomId,
    getGameUrl,
    updateGameUrl,
  };
};

export default useRoom;
