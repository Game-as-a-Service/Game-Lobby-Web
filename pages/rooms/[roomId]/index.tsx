import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import RoomBreadcrumb from "@/components/rooms/RoomBreadcrumb";
import GameWindow from "@/components/rooms/GameWindow";
import useRequest from "@/hooks/useRequest";
import useRoom from "@/hooks/useRoom";
import useAuth from "@/hooks/context/useAuth";
import usePopup from "@/hooks/usePopup";
import useSocketCore from "@/hooks/context/useSocketCore";
import { SOCKET_EVENT } from "@/contexts/SocketContext";
import {
  getRoomInfoEndpoint,
  kickUser,
  closeRoom,
  RoomInfo,
  leaveRoom,
  playerReady,
  playerCancelReady,
  startGame,
} from "@/requests/rooms";

type User = Omit<RoomInfo.User, "isReady">;

export default function Room() {
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
  const { socket } = useSocketCore();
  const { currentUser, token } = useAuth();
  const { Popup, firePopup } = usePopup();
  const { fetch } = useRequest();
  const { query, replace } = useRouter();
  const [gameUrl, setGameUrl] = useState("");
  const roomId = query.roomId as string;
  const player = roomInfo.players.find(
    (player) => player.id === currentUser?.id
  );
  const isHost = roomInfo.host.id === currentUser?.id;

  useEffect(() => {
    async function getRoomInfo() {
      const roomInfo = await fetch(getRoomInfoEndpoint(roomId));
      initializeRoom(roomInfo);
    }

    getRoomInfo();

    return () => {
      cleanUpRoom();
    };
  }, [fetch, initializeRoom, cleanUpRoom, roomId]);

  useEffect(() => {
    if (!socket || !currentUser?.id) return;

    socket.on(SOCKET_EVENT.USER_JOINED, ({ user }: { user: User }) => {
      addPlayer(user);
    });

    socket.on(SOCKET_EVENT.USER_LEFT, ({ user }: { user: User }) => {
      if (user.id === currentUser.id) {
        firePopup({
          title: `你已被踢出房間`,
          onConfirm: () => replace("/"),
        });
      }
      removePlayer(user.id);
    });

    socket.on(SOCKET_EVENT.USER_READY, ({ user }: { user: User }) => {
      updateUserReadyStatus({ ...user, isReady: true });
    });

    socket.on(SOCKET_EVENT.USER_NOT_READY, ({ user }: { user: User }) => {
      updateUserReadyStatus({ ...user, isReady: false });
    });

    socket.on(SOCKET_EVENT.HOST_CHANGED, ({ user }: { user: User }) => {
      updateHost(user.id);
    });

    socket.on(SOCKET_EVENT.GAME_STARTED, ({ gameUrl }: { gameUrl: string }) => {
      updateRoomStatus("PLAYING");
      setGameUrl(`${gameUrl}?token=${token}`);
    });

    socket.on(SOCKET_EVENT.GAME_ENDED, () => {
      updateRoomStatus("WAITING");
      setGameUrl("");
      firePopup({
        title: `遊戲已結束!`,
      });
      fetch(getRoomInfoEndpoint(roomId)).then(initializeRoom);
    });

    socket.on(SOCKET_EVENT.ROOM_CLOSED, () => {
      firePopup({
        title: `房間已關閉!`,
        onConfirm: () => replace("/"),
      });
    });
  }, [
    token,
    socket,
    currentUser?.id,
    roomId,
    addPlayer,
    removePlayer,
    updateUserReadyStatus,
    updateHost,
    updateRoomStatus,
    replace,
    firePopup,
    fetch,
    initializeRoom,
  ]);

  // Event: kick user
  async function handleClickKick(user: User) {
    const handleKickUser = async () => {
      try {
        await fetch(kickUser({ roomId, userId: user.id }));
      } catch (err) {
        firePopup({ title: `error!` });
      }
    };

    firePopup({
      title: `確定要將 ${user.nickname} 踢出房間？`,
      showCancelButton: true,
      onConfirm: handleKickUser,
    });
  }

  // Event: close room
  function handleClickClose() {
    const handleCloseRoom = async () => {
      try {
        await fetch(closeRoom(roomId));
        replace("/rooms");
      } catch (err) {
        firePopup({ title: "error!" });
      }
    };

    firePopup({
      title: `確定要將房間關閉？`,
      showCancelButton: true,
      onConfirm: handleCloseRoom,
    });
  }

  // Event: leave room
  const handleLeave = () => {
    const leave = async () => {
      try {
        await fetch(leaveRoom(roomId));
        replace("/rooms");
      } catch (err) {
        firePopup({ title: "error!" });
      }
    };

    firePopup({
      title: isHost
        ? `當您離開房間後，房主的位子將會自動移交給其他成員，若房間內沒有成員則會自動關閉房間，是否確定要離開房間？`
        : `是否確定要離開房間？`,
      showCancelButton: true,
      onConfirm: leave,
    });
  };

  // Event: toggle ready
  const handleToggleReady = async () => {
    try {
      player?.isReady
        ? await fetch(playerCancelReady(roomId))
        : await fetch(playerReady(roomId));
    } catch (err) {
      firePopup({ title: `error!` });
    }
  };

  // Event: start game
  const handleStart = async () => {
    try {
      // Check all players are ready
      const allReady = roomInfo.players.every((player) => player.isReady);
      if (!allReady) return firePopup({ title: "尚有玩家未準備就緒" });
      await fetch(startGame(roomId));
    } catch (err) {
      firePopup({ title: `error!` });
    }
  };

  return (
    <section className="px-6">
      <div className="relative w-full h-[280px] overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1601987177651-8edfe6c20009?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#0f0919] to-50% to-[#170D2500]"></div>
        <div className="m-2 py-1 px-2 w-fit bg-gray-950/50 backdrop-blur-sm rounded-lg text-sm">
          <RoomBreadcrumb roomInfo={roomInfo} />
        </div>
        <div className="m-2 py-1 px-2 w-fit bg-gray-950/50 backdrop-blur-sm rounded-lg text-sm">
          {roomInfo.isLocked ? "非公開" : "公開"}
        </div>
        <div className="m-2 py-1 px-2 w-fit bg-gray-950/50 backdrop-blur-sm rounded-lg text-sm">
          {roomInfo.currentPlayers} / {roomInfo.maxPlayers} 人
        </div>
        <div className="absolute bottom-0 right-0 flex items-center">
          <RoomButtonGroup
            onToggleReady={handleToggleReady}
            onClickClose={handleClickClose}
            onClickLeave={handleLeave}
            onClickStart={handleStart}
            isHost={isHost}
            isReady={isHost || !!player?.isReady}
          />
        </div>
      </div>
      <RoomUserCardList
        roomInfo={roomInfo}
        currentUserId={currentUser?.id}
        onKickUser={handleClickKick}
      />
      {gameUrl && <GameWindow gameUrl={gameUrl} />}
      <Popup />
    </section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
