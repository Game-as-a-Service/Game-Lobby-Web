import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/shared/components/Button";
import UserCard, { UserCardProps } from "./components/UserCard";
import useRequest from "@/shared/hooks/useRequest";
import useRoom from "@/shared/hooks/context/useRoom";
import { getRoomInfoEndpoint } from "@/requests/rooms";
import { RoomInfoType } from "@/shared/containers/provider/RoomProvider/type";

const SEAT_AMOUNT = 10;

export default function Room() {
  const {
    roomInfo,
    initialize,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    toggleUserReadyStatus,
    cleanRoom,
  } = useRoom();
  const { fetch } = useRequest();
  const { query } = useRouter();
  const roomId = query.roomId as string;

  useEffect(() => {
    async function getRoomInfo() {
      const roomInfo = (await fetch(
        getRoomInfoEndpoint(roomId)
      )) as any as RoomInfoType;
      initialize(roomInfo);
    }

    getRoomInfo();
  }, [fetch, initialize, roomId]);

  // mock behavior start
  useEffect(() => {
    setTimeout(() => {
      addPlayer({ id: "bcd", nickname: "第二位進來啦" });
    }, 2000);

    setTimeout(() => {
      addPlayer({ id: "bcde", nickname: "第三位進來啦" });
    }, 3000);
  }, [addPlayer]);

  useEffect(() => {
    setTimeout(() => {
      updateHost("bcd");
    }, 4000);
  }, [updateHost]);

  useEffect(() => {
    setTimeout(() => {
      updateRoomStatus("PLAYING");
    }, 5000);
  }, [updateRoomStatus]);

  useEffect(() => {
    setTimeout(() => {
      removePlayer("bcd");
    }, 6000);
  }, [removePlayer]);

  useEffect(() => {
    setTimeout(() => {
      toggleUserReadyStatus("abc");
    }, 7000);
  }, [toggleUserReadyStatus]);

  useEffect(() => {
    setTimeout(() => cleanRoom(), 8000);
  }, [cleanRoom]);
  // mock behavior end

  function renderUserCards(users: RoomInfoType["players"]) {
    const userCount = users.length;

    const userCards = users.map((user) => {
      const props: UserCardProps = {
        nickName: user.nickname,
        isReady: user.isReady,
        // TODO: 假設使用者本人的 id 為 abc
        isSelf: user.id === "abc",
        isHost: user.id === roomInfo.host.id,
      };
      return <UserCard key={user.id} {...props} />;
    });

    // render rest seats
    const emptyCards = Array.from({
      length: SEAT_AMOUNT - userCount,
    }).map((_, index) => {
      // render wating seat
      if (userCount + index < roomInfo.maxPlayers)
        return <UserCard key={userCount + index} isWating />;
      // render disabled seat
      return <UserCard key={userCount + index} disabled />;
    });

    return [...userCards, ...emptyCards];
  }

  return (
    <div className="p-[18px] flex flex-col gap-[36px] max-w-[1172px] bg-[#212123]">
      <div className="userList grid grid-cols-5 gap-x-5 gap-y-[60px]">
        {renderUserCards(roomInfo.players)}
      </div>
      <div className="flex items-center">
        <div className="grow min-w-[643px] border self-stretch text-center text-white">
          聊天室區塊
        </div>
        <div className="flex flex-col gap-[18px] font-normal text-sm leading-[22px] ml-[40px] mr-[52px]">
          <Button className="bg-[#2D2D2E] rounded-[21px] w-[165px] h-10 flex justify-center text-white">
            準備
          </Button>
          <Button className="bg-[#2D2D2E] rounded-[21px] w-[165px] h-10 flex justify-center text-white">
            退出房間
          </Button>
          <Button className="bg-[#2D2D2E] rounded-[21px] w-[165px] h-10 flex justify-center text-white">
            關閉房間
          </Button>
        </div>
        <Button
          variant="secondary"
          className="min-w-[152px] w-[166px] h-[132px] rounded-[30px] text-white text-2xl leading-9 flex justify-center"
        >
          開始遊戲
        </Button>
      </div>
    </div>
  );
}
