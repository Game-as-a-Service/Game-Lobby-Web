import { useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/shared/components/Button";
import UserCard, { UserCardProps } from "@/core/rooms/components/UserCard";
import useRequest from "@/shared/hooks/useRequest";
import useRoom from "@/shared/hooks/context/useRoom";
import { getRoomInfoEndpoint } from "@/requests/rooms";
import { RoomInfoType } from "@/shared/containers/provider/RoomProvider/type";
// import useUser from "@/shared/hooks/useUser";
// import { User } from "@/requests/auth/user";

const SEAT_AMOUNT = 10;

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
  const { fetch } = useRequest();
  const { query, push } = useRouter();
  const roomId = query.roomId as string;
  // const { getCurrentUser } = useUser();
  // const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    async function getRoomInfo() {
      const roomInfo = (await fetch(
        getRoomInfoEndpoint(roomId)
      )) as any as RoomInfoType;
      initializeRoom(roomInfo);
    }
    getRoomInfo();
    return () => {
      cleanUpRoom();
    };
  }, [fetch, initializeRoom, cleanUpRoom, roomId]);

  useEffect(() => {
    // BUG: (maybe) the usage below would cause infinity re-render
    // async function getCurrentUserInfo() {
    //   const user = await getCurrentUser();
    //   user && setCurrentUser(user);
    // }
    // getCurrentUserInfo();
  }, []);

  function renderUserCards(users: RoomInfoType["players"]) {
    const userCount = users.length;

    const userCards = users.map((user) => {
      const props: UserCardProps = {
        nickName: user.nickname,
        isReady: user.isReady,
        // isSelf: user.id === currentUser?.uid,
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
          <Button
            className="bg-[#2D2D2E] rounded-[21px] w-[165px] h-10 flex justify-center text-white"
            onClick={() => push("/")}
          >
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
