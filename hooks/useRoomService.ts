import { useCallback, useEffect } from "react";
import useRoom from "@/hooks/useRoom";
import { useSocketCore } from "@/contexts/socket";
import { RoomInfo } from "@/requests/rooms";
import { useAuth } from "@/contexts/auth";

type User = Omit<RoomInfo.User, "isReady">;

/**
 * Hook for managing room operations using the RoomSocketService
 */
export default function useRoomService(roomId?: string) {
  const {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    updateUserReadyStatus,
    cleanUpRoom,
  } = useRoom();
  const { socketService } = useSocketCore();
  const { currentUser } = useAuth();
  const roomService = socketService.room();

  // Register all socket event handlers for room management
  useEffect(() => {
    if (!roomId || !currentUser?.id) return;

    // Set up event listeners for room events
    roomService.onUserJoined(({ user }: { user: User }) => {
      addPlayer(user);
    });

    roomService.onUserLeft(({ user }: { user: User }) => {
      removePlayer(user.id);
    });

    roomService.onUserReady(({ user }: { user: User }) => {
      updateUserReadyStatus({ ...user, isReady: true });
    });

    roomService.onUserNotReady(({ user }: { user: User }) => {
      updateUserReadyStatus({ ...user, isReady: false });
    });

    roomService.onHostChanged(({ user }: { user: User }) => {
      updateHost(user.id);
    });

    roomService.onGameStarted(({ gameUrl }) => {
      updateRoomStatus("PLAYING");
      return gameUrl; // Return it for the component to use
    });

    roomService.onGameEnded(() => {
      updateRoomStatus("WAITING");
    });

    // Clean up event listeners when component unmounts or roomId changes
    return () => {
      roomService.offAll("USER_JOINED" as any);
      roomService.offAll("USER_LEFT" as any);
      roomService.offAll("USER_READY" as any);
      roomService.offAll("USER_NOT_READY" as any);
      roomService.offAll("HOST_CHANGED" as any);
      roomService.offAll("GAME_STARTED" as any);
      roomService.offAll("GAME_ENDED" as any);
      roomService.offAll("ROOM_CLOSED" as any);
    };
  }, [
    roomId,
    currentUser?.id,
    roomService,
    addPlayer,
    removePlayer,
    updateUserReadyStatus,
    updateHost,
    updateRoomStatus,
  ]);

  // Join a room
  const joinRoom = useCallback(
    (roomId: string) => {
      if (!currentUser) return;
      roomService.joinRoom(roomId, {
        id: currentUser.id,
        nickname: currentUser.nickname,
      });
    },
    [currentUser, roomService]
  );

  // Leave a room
  const leaveRoom = useCallback(
    (roomId: string) => {
      if (!currentUser) return;
      roomService.leaveRoom(roomId, {
        id: currentUser.id,
        nickname: currentUser.nickname,
      });
    },
    [currentUser, roomService]
  );

  // Set player ready status
  const setPlayerReady = useCallback(
    (isReady: boolean) => {
      if (!currentUser) return;
      roomService.setPlayerReady(
        {
          id: currentUser.id,
          nickname: currentUser.nickname,
        },
        isReady
      );
    },
    [currentUser, roomService]
  );

  return {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    updateUserReadyStatus,
    cleanUpRoom,
    joinRoom,
    leaveRoom,
    setPlayerReady,
  };
}
