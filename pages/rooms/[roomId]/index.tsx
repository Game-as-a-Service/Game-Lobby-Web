import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import RoomBreadcrumb from "@/components/rooms/RoomBreadcrumb";
import RoomChatroom from "@/components/rooms/RoomChatroom";
import useRequest from "@/hooks/useRequest";
import useRoom from "@/hooks/useRoom";
import useAuth from "@/hooks/context/useAuth";
import usePopup from "@/hooks/usePopup";
import { useSocket } from "@/containers/provider/SocketProvider";
import {
  getRoomInfoEndpoint,
  kickUser,
  closeRoom,
  RoomInfo,
  leaveRoom,
  playerReady,
  playerCancelReady,
} from "@/requests/rooms";

export default function Room() {
  const {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    // updateHost,
    updateRoomStatus,
    toggleUserReadyStatus,
    cleanUpRoom,
  } = useRoom();
  const { currentUser } = useAuth();
  const { Popup, firePopup } = usePopup();
  const { fetch } = useRequest();
  const { query, push, replace } = useRouter();
  const roomId = query.roomId as string;
  const player = roomInfo.players.find(
    (player) => player.id === currentUser?.id
  );
  const socket = useSocket();
  const [user, setUser] = useState<RoomInfo.User>({
    id: "",
    nickname: "",
    isReady: false,
  });
  const [users, setUsers] = useState<RoomInfo.User[]>([]);

  const getRoomInfo = useCallback(async () => {
    const roomInfo = await fetch(getRoomInfoEndpoint(roomId));
    initializeRoom(roomInfo);
  }, [fetch, roomId, initializeRoom]);

  useEffect(() => {
    getRoomInfo();

    return () => {
      cleanUpRoom();
    };
  }, [cleanUpRoom]);

  useEffect(() => {
    const userId = socket.id;
    const userInfo: RoomInfo.User = {
      id: userId,
      nickname: "玩家_" + userId.slice(0, 4),
      isReady: false,
    };
    setUser(userInfo);
    // console.log(roomInfo);

    socket.emit("join_room", { roomId, user: userInfo });

    socket.on("USER_JOINED", (user) => {
      addPlayer(user);
    });

    socket.on("USER_READY", (user) => {
      // console.log("玩家已經準備好了: ", user);
      toggleUserReadyStatus(user);
    });

    socket.on("USER_LEFT", (userId) => {
      // console.log("玩家已離開");
      removePlayer(userId);
    });

    return () => {
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    // console.log("current: ", user);
    // console.log("Players: ", users);
  }, [user, users]);

  // Event: kick user
  async function handleClickKick(user: Omit<RoomInfo.User, "isReady">) {
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

  // the user leave room
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
      title:
        roomInfo.host.id === currentUser?.id
          ? `當您離開房間後，房主的位子將會自動移交給其他成員，若房間內沒有成員則會自動關閉房間，是否確定要離開房間？`
          : `是否確定要離開房間？`,
      showCancelButton: true,
      onConfirm: leave,
    });
  };

  const handleToggleReady = async () => {
    try {
      const { message } = player?.isReady
        ? await fetch(playerCancelReady(roomId))
        : await fetch(playerReady(roomId));
    } catch (err) {
      firePopup({ title: `error!` });
    }
  };

  // // SocketEvent: on user self be kicked
  // function onUserSelfKicked() {
  //   firePopup({
  //     title: `你已被踢出房間`,
  //     onConfirm: () => push("/"),
  //   });
  // }

  // // SocketEvent: on someone leave or be kicked
  // function onUserLeave(userId: string) {
  //   removePlayer(userId);
  // }

  return (
    <section className="px-[18px] py-4 max-w-[1172px] ">
      <RoomBreadcrumb roomInfo={roomInfo} />
      <RoomUserCardList
        roomInfo={roomInfo}
        // currentUserId={user?.id}
        currentUserId={currentUser?.id}
        onKickUser={handleClickKick}
      />
      <div className="flex items-center">
        <RoomChatroom roomId={roomId} />
        <RoomButtonGroup
          onToggleReady={handleToggleReady}
          onClickClose={handleClickClose}
          onClickLeave={handleLeave}
          onClickStart={() => {}}
          isHost={roomInfo.host.id === currentUser?.id}
          isReady={player?.isReady || false}
        />
      </div>
      <Popup />
    </section>
  );
}
