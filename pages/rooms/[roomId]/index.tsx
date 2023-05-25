import Button from "@/shared/components/Button";
import UserCard, { UserCardProps } from "./components/UserCard";

const SEAT_AMOUNT = 10;

export default function Room() {
  function renderUserCards(users: UserCardProps[]) {
    const userCount = users.length;
    const userCards = users.map((user, index) => (
      <UserCard key={user.userName || index} {...user} />
    ));
    const disabledCards = Array.from({ length: SEAT_AMOUNT - userCount }).map(
      (_, index) => <UserCard key={userCount + index} disabled />
    );
    return [...userCards, ...disabledCards];
  }

  return (
    <div className="p-[18px] flex flex-col gap-[36px] max-w-[1172px] bg-[#212123]">
      <div className="userList grid grid-cols-5 gap-x-5 gap-y-[60px]">
        {renderUserCards(mockUsers)}
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

const mockUsers: UserCardProps[] = [
  {
    userName: "abc",
    isReady: false,
    isHost: true,
    isSelf: true,
  },
  {
    userName: "abcd",
    isReady: false,
    isHost: false,
    isSelf: false,
  },
  {
    userName: "abcde",
    isReady: true,
    isHost: false,
    isSelf: false,
  },
  {},
];
