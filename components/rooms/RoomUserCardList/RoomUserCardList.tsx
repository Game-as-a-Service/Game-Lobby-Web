import { RoomInfo } from "@/requests/rooms";
import UserCard, { UserCardProps } from "./UserCard/UserCard";

const SEAT_AMOUNT = 10;

type RoomUserCardListProps = {
  roomInfo: RoomInfo.Room;
  currentUserId: string | undefined;
  onKickUser?: (User: Omit<RoomInfo.User, "isReady">) => void;
};

function RoomUserCardList({
  roomInfo,
  currentUserId,
  onKickUser,
}: RoomUserCardListProps) {
  function renderUserCards(users: RoomInfo.User[]) {
    const userCount = users.length;

    const haveRightToKick = (userId: string) =>
      currentUserId === roomInfo.host.id && currentUserId !== userId;

    const userCards = users.map((user) => {
      const props: UserCardProps = {
        id: user.id,
        nickname: user.nickname,
        isReady: user.isReady,
        isSelf: user.id === currentUserId,
        isHost: user.id === roomInfo.host.id,
        onKickUser: haveRightToKick(user.id) ? onKickUser : undefined,
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
    <div className="pt-4 grid grid-cols-5 gap-x-5 gap-y-[60px]">
      {renderUserCards(roomInfo.players)}
    </div>
  );
}

export default RoomUserCardList;
