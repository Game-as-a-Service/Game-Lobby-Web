import { RoomInfo } from "@/requests/rooms";
import UserCard, { UserCardProps } from "./UserCard/UserCard";

const SEAT_AMOUNT = 10;

export type RoomUserCardListProps = {
  roomInfo: RoomInfo.Room;
  currentUserId: string | undefined;
};

function RoomUserCardList({ roomInfo, currentUserId }: RoomUserCardListProps) {
  function renderUserCards(users: RoomInfo.User[]) {
    const userCount = users.length;

    const userCards = users.map((user) => {
      const props: UserCardProps = {
        nickName: user.nickname,
        isReady: user.isReady,
        isSelf: user.id === (currentUserId || ""),
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
    <div className="grid grid-cols-5 gap-x-5 gap-y-[60px]">
      {renderUserCards(roomInfo.players)}
    </div>
  );
}

export default RoomUserCardList;
