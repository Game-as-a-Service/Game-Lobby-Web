import { cn } from "@/lib/utils";
import { Room } from "@/requests/rooms";
import Lock from "../../public/images/padlock.svg";
import Cover from "../shared/Cover";

type RoomsCardProps = {
  key: string;
  room: Room;
  active: boolean;
  className?: string;
  onClick: (id: string) => void;
};
const RoomCard = ({ room, active, onClick }: RoomsCardProps) => {
  const LockIcon = () => <Lock className="w-5 h-5" />;

  const roomCardClass = cn(
    "room__card",
    "relative cursor-pointer hover:border-blue2f transition-all duration-300",
    "grid grid-cols-[34px_1fr] gap-[12px] rounded-[10px] border-2 border-dark1E py-[11px] pl-[11px] pr-[20px] bg-dark1E",
    {
      "border-blue": active,
    }
  );

  const lackTotalPlayers = room.maxPlayers - room.currentPlayers;

  return (
    <div className={roomCardClass} onClick={() => onClick(room.id)}>
      <Cover
        className="w-[34px] h-[34px] rounded-[10px]"
        fill
        sizes="100vw"
        src="/images/game-avatar.jpg"
        alt={room.game.name}
      />
      <div className={cn("grid gap-[7px]")}>
        <h3 className={cn("text-white truncate")}>{room.name}</h3>
        <div className={cn("text-white")}>
          <span className={cn("text-blue2f)")}>{room.maxPlayers}</span>
          人房，
          {lackTotalPlayers > 0 ? (
            <>
              還缺
              <span className={cn("text-blue2f")}>{lackTotalPlayers}</span>人
            </>
          ) : (
            <>人數已滿</>
          )}
        </div>
      </div>
      {/* 檢查是否上鎖 */}
      {room.isLocked && (
        <div className={cn("absolute z-3 -left-[10px] -top-[10px]")}>
          {LockIcon()}
        </div>
      )}
    </div>
  );
};

export default RoomCard;
