import { useEffect } from "react";
import { useRouter } from "next/router";
import RoomUserCardList from "@/components/rooms/RoomUserCardList";
import RoomButtonGroup from "@/components/rooms/RoomButtonGroup";
import RoomBreadcrumb from "@/components/rooms/RoomBreadcrumb";
import useRequest from "@/hooks/useRequest";
import useRoom from "@/hooks/useRoom";
import useAuth from "@/hooks/context/useAuth";
import { getRoomInfoEndpoint } from "@/requests/rooms";

export default function Room() {
  const {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    toggleUserReadyStatus,
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
    <section className="bg-[#212123] px-[10px] py-4">
      <RoomBreadcrumb roomInfo={roomInfo} />
      <div className="pt-4 flex flex-col gap-[36px] max-w-[1172px] ">
        <RoomUserCardList roomInfo={roomInfo} currentUserId={currentUser?.id} />
        <div className="flex items-center">
          <div className="grow min-w-[643px] border self-stretch text-center text-white">
            聊天室區塊
          </div>
          <RoomButtonGroup
            onClickClose={() => push("/")}
            onClickLeave={() => push("/")}
            onToggleReady={() => {}}
            onClickStart={() => {}}
          />
        </div>
      </div>
    </section>
  );
}
