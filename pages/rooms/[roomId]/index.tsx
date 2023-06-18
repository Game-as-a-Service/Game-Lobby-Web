import { useEffect } from "react";
import { useRouter } from "next/router";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import RoomBreadcrumb from "@/components/rooms/RoomBreadcrumb";
import RoomChatroom from "@/components/rooms/RoomChatroom";
import useRequest from "@/hooks/useRequest";
import useRoom from "@/hooks/useRoom";
import useAuth from "@/hooks/context/useAuth";
import usePopup from "@/hooks/usePopup";
import {
  getRoomInfoEndpoint,
  kickUser,
  closeRoom,
  RoomInfo,
} from "@/requests/rooms";

export default function Room() {
  const {
    roomInfo,
    initializeRoom,
    // addPlayer,
    // removePlayer,
    // updateHost,
    // updateRoomStatus,
    // toggleUserReadyStatus,
    cleanUpRoom,
  } = useRoom();
  const { currentUser } = useAuth();
  const { Popup, firePopup } = usePopup();
  const { fetch } = useRequest();
  const { query, push } = useRouter();
  const roomId = query.roomId as string;

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

  // Event: kick user
  async function handleClickKick(user: Omit<RoomInfo.User, "isReady">) {
    const handleKickUser = async () => {
      try {
        await fetch(kickUser({ roomId, userId: user.id }));
      } catch (err) {
        // TODO handle error
      }
    };

    firePopup({
      title: `確定要將 ${user.nickname} 踢除房間？`,
      showCancelButton: true,
      onConfirm: handleKickUser,
    });
  }

  // Event: close room
  function handleClickClose() {
    const handleCloseRoom = async () => {
      try {
        await fetch(closeRoom(roomId));
        push("/");
      } catch (err) {
        // TODO handle error
      }
    };

    firePopup({
      title: `確定要將房間關閉？`,
      showCancelButton: true,
      onConfirm: handleCloseRoom,
    });
  }

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
        currentUserId={currentUser?.id}
        onKickUser={handleClickKick}
      />
      <div className="flex items-center">
        <RoomChatroom roomId={roomId} />
        <RoomButtonGroup
          onToggleReady={() => {}}
          onClickClose={handleClickClose}
          onClickLeave={() => push("/")}
          onClickStart={() => {}}
          isHost={roomInfo.host.id === currentUser?.id}
        />
      </div>
      <Popup />
    </section>
  );
}
