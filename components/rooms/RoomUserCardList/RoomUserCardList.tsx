import { RoomInfo } from "@/requests/rooms";
import { UserCard } from "@/features/user";
import { generateUUID } from "@/lib/utils";

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
  const players = Array.isArray(roomInfo.players) ? roomInfo.players : [];
  const lackTotalPlayers = Array.from(
    { length: roomInfo.maxPlayers - players.length },
    generateUUID
  );

  return (
    <div className="pt-4 grid grid-cols-5 gap-5">
      {players.map((player) => (
        <UserCard
          key={player.id}
          id={player.id}
          nickname={player.nickname}
          isSelf={player.id === currentUserId}
          isHost={player.id === roomInfo.host.id}
        />
      ))}
      {lackTotalPlayers.map((id) => (
        <UserCard key={id} />
      ))}
    </div>
  );
}

export default RoomUserCardList;
