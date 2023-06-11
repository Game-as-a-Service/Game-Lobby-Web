import { useEffect } from "react";
import { useRouter } from "next/router";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import RoomBreadcrumb from "@/components/rooms/RoomBreadcrumb";
import useRequest from "@/hooks/useRequest";
import useRoom from "@/hooks/useRoom";
import useAuth from "@/hooks/context/useAuth";
import { getRoomInfoEndpoint } from "@/requests/rooms";
import RoomChatroom from "@/components/rooms/RoomChatroom";

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

  return (
    <section className="px-[18px] py-4 max-w-[1172px] ">
      <RoomBreadcrumb roomInfo={roomInfo} />
      <RoomUserCardList roomInfo={roomInfo} currentUserId={currentUser?.id} />
      <div className="flex items-center">
        <RoomChatroom roomId={roomId} />
        <RoomButtonGroup
          onClickClose={() => push("/")}
          onClickLeave={() => push("/")}
          onToggleReady={() => {}}
          onClickStart={() => {}}
        />
      </div>
    </section>
  );
}
