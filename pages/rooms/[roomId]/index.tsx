import { useEffect, useRef, useState } from "react";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { GameWindow } from "@/features/game";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import Button from "@/components/shared/Button";
import { useAuth } from "@/contexts/auth";
import usePopup from "@/hooks/usePopup";
import { useSocketCore } from "@/contexts/socket";
import { SOCKET_EVENT } from "@/contexts/socket";
import Modal from "@/components/shared/Modal";
import { CreateRoomForm, JoinLockRoomForm } from "@/features/room";
import {
  useGetRoom,
  useFindGameRegistrations,
  useJoinRoom,
  useLeaveRoom,
  useKickPlayer,
  useCloseRoom,
  useReadyForRoom,
  useCancelReadyForRoom,
  useStartGame,
  type GetRoomViewModel as Room,
  type Player,
} from "@/services/api";
import useAuthActions from "@/hooks/useAuthActions";
import useRoomCookie from "@/hooks/useRoom";
import { UserCard } from "@/features/user";
import Image from "@/components/shared/Image";
import Breadcrumb from "@/components/shared/Breadcrumb";

const RoomDetailPage: NextPage = () => {
  const { socket } = useSocketCore();
  const { currentUser, token, setToken } = useAuth();
  const { authentication } = useAuthActions();
  const { updateRoomId, updateGameUrl, getGameUrl } = useRoomCookie();
  const { Popup, firePopup } = usePopup();
  const { query, replace } = useRouter();
  const roomId = query.roomId as string;

  const { data: roomInfo, mutate: mutateRoom, isLoading } = useGetRoom(roomId);
  const { data: gameList } = useFindGameRegistrations();
  const kickPlayerMutation = useKickPlayer(roomId, "");
  const closeRoomMutation = useCloseRoom(roomId);
  const leaveRoomMutation = useLeaveRoom(roomId);
  const startGameMutation = useStartGame(roomId);

  const [gameUrl, setGameUrl] = useState(getGameUrl);
  const isHost = roomInfo?.host.id === currentUser?.id;
  const gameInfo = gameList?.find((game) => game.id === roomInfo?.game.id);

  useEffect(() => {
    if (!isLoading && !roomInfo && roomId) {
      updateRoomId();
      replace("/rooms");
    }
  }, [isLoading, roomInfo, roomId, updateRoomId, replace]);

  useEffect(() => {
    if (!socket || !currentUser?.id) return;

    socket.on(SOCKET_EVENT.USER_JOINED, () => {
      mutateRoom?.();
    });

    socket.on(SOCKET_EVENT.USER_LEFT, ({ user }: { user: Player }) => {
      if (user.id === currentUser.id) {
        updateRoomId();
        firePopup({
          title: `你已被踢出房間`,
          onConfirm: () => replace("/"),
        });
      }
      mutateRoom?.();
    });

    socket.on(SOCKET_EVENT.HOST_CHANGED, () => {
      mutateRoom?.();
    });

    socket.on(
      SOCKET_EVENT.GAME_STARTED,
      async ({ gameUrl }: { gameUrl: string }) => {
        if (!token) return;
        const authResult = await authentication(token);
        const newGameUrl = `${gameUrl}?token=${authResult.token}`;
        setToken(authResult.token);
        setGameUrl(newGameUrl);
        updateGameUrl(newGameUrl);
        mutateRoom?.();
      }
    );

    socket.on(SOCKET_EVENT.GAME_ENDED, () => {
      setGameUrl("");
      updateGameUrl();
      firePopup({
        title: `遊戲已結束!`,
      });
      mutateRoom?.();
    });

    socket.on(SOCKET_EVENT.ROOM_CLOSED, () => {
      updateRoomId();
      firePopup({
        title: `房間已關閉!`,
        onConfirm: () => replace("/"),
      });
    });

    return () => {
      socket.off(SOCKET_EVENT.USER_JOINED);
      socket.off(SOCKET_EVENT.USER_LEFT);
      socket.off(SOCKET_EVENT.HOST_CHANGED);
      socket.off(SOCKET_EVENT.GAME_STARTED);
      socket.off(SOCKET_EVENT.GAME_ENDED);
      socket.off(SOCKET_EVENT.ROOM_CLOSED);
    };
  }, [
    token,
    socket,
    currentUser?.id,
    roomId,
    updateRoomId,
    updateGameUrl,
    replace,
    firePopup,
    authentication,
    mutateRoom,
    setToken,
  ]);

  async function handleClickKick(user: Player) {
    const handleKickUser = async () => {
      try {
        await kickPlayerMutation.trigger();
        mutateRoom?.();
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

  function handleClickClose() {
    const handleCloseRoom = async () => {
      try {
        await closeRoomMutation.trigger();
        replace("/rooms");
        updateRoomId();
        updateGameUrl();
      } catch (err) {
        firePopup({ title: "error!" });
      }
    };

    firePopup({
      title: "確定要將房間關閉嗎？",
      showCancelButton: true,
      onConfirm: handleCloseRoom,
    });
  }

  const handleLeave = () => {
    const leave = async () => {
      try {
        await leaveRoomMutation.trigger();
        replace("/rooms");
        updateRoomId();
        updateGameUrl();
      } catch (err) {
        firePopup({ title: "error!" });
      }
    };

    firePopup({
      title: gameUrl ? "確定離開遊戲嗎？" : "確定離開房間嗎？",
      showCancelButton: true,
      onConfirm: leave,
    });
  };

  const handleStart = async () => {
    try {
      if (!token) return;
      await startGameMutation.trigger();
    } catch (err) {
      firePopup({ title: `error!` });
    }
  };

  // 如果房間數據還在加載，顯示加載狀態
  if (!roomInfo) {
    return (
      <section className="px-4 flex items-center justify-center h-[calc(100dvh-104px)]">
        <div>加載中...</div>
      </section>
    );
  }

  return (
    <section className="px-4">
      {gameUrl ? (
        <GameWindow
          className="h-[calc(100dvh-104px)] w-full"
          gameUrl={gameUrl}
          onLeaveGame={handleLeave}
        />
      ) : (
        <>
          <div className="relative w-full h-[280px] overflow-hidden">
            {roomInfo.currentPlayers && (
              <Image
                src={gameInfo?.img || gameDefaultCoverImg.src}
                alt={gameInfo?.name || "default game cover"}
                priority
                fill
                className="object-cover"
              />
            )}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#0f0919] to-50% to-[#170D2500]"></div>
            <div className="m-2 py-1 px-2 w-fit bg-basic-black/50 backdrop-blur-sm rounded-lg text-sm">
              <Breadcrumb className="text-primary-100">
                <Breadcrumb.Item
                  text={`${roomInfo.isLocked ? "私人" : "公開"}遊戲房間`}
                />
                <Breadcrumb.Item
                  text={`${roomInfo.game.name} - ${roomInfo.name}`}
                />
              </Breadcrumb>
            </div>
            <div className="m-2 py-1 px-2 w-fit bg-error-700/50 backdrop-blur-sm rounded-lg text-sm text-grey-100">
              等待玩家加入中
            </div>
            <div className="m-2 py-1 px-2 w-fit bg-basic-black/50 backdrop-blur-sm rounded-lg text-sm text-grey-100">
              {roomInfo.currentPlayers} / {roomInfo.maxPlayers} 人 ({" "}
              {roomInfo.minPlayers} - {roomInfo.maxPlayers} )
            </div>
            <div className="absolute bottom-0 right-0 flex items-center">
              <RoomButtonGroup
                onClickClose={handleClickClose}
                onClickLeave={handleLeave}
                onClickStart={handleStart}
                isHost={isHost}
              />
            </div>
          </div>
          <RoomUserCardList
            roomInfo={roomInfo}
            currentUserId={currentUser?.id}
            onKickUser={handleClickKick}
          />
        </>
      )}
      <Popup />
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default RoomDetailPage;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
