import { useState } from "react";
import { cn } from "@/lib/utils";
import { Room } from "@/requests/rooms";
import Image from "next/image";
import Lock from "../../public/images/padlock.svg";

type RoomsCardProps = {
  key: string;
  room: Room;
  active: boolean;
  className?: string;
  onClick: (id: string) => void;
};
const RoomCard = ({ room, active, onClick }: RoomsCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const LockIcon = () => <Lock className="w-5 h-5" />;

  const roomCardClass = cn(
    "room__card",
    "relative cursor-pointer hover:border-blue transition-all duration-300",
    "grid grid-cols-[34px_1fr] gap-[12px] rounded-[10px] border-2 border-dark1E py-[11px] pl-[11px] pr-[20px] bg-dark1E",
    {
      "border-blue": active,
    }
  );

  const lackTotalPlayers = room.maxPlayers - room.currentPlayers;

  return (
    <div className={roomCardClass} onClick={() => onClick(room.id)}>
      <div
        className={cn(
          "game__cover",
          "relative w-[34px] h-[34px] overflow-hidden rounded-[10px] bg-[#666]"
        )}
      >
        <Image
          className={cn("w-full object-cover object-center", {
            invisible: !loaded,
          })}
          fill={true}
          sizes="100vw"
          src="http://localhost:3030/images/game-avatar.jpg"
          onLoadingComplete={() => setLoaded(true)}
          alt={room.game.name}
          loading="lazy"
        />
      </div>
      <div className={cn("grid gap-[7px]")}>
        <h3 className={cn("text-white truncate")}>{room.name}</h3>
        <div className={cn("text-white")}>
          <span className={cn("text-blue")}>{room.maxPlayers}</span>
          人房，
          {lackTotalPlayers > 0 ? (
            <>
              還缺
              <span className={cn("text-blue")}>{lackTotalPlayers}</span>人
            </>
          ) : (
            <>人數已滿</>
          )}
        </div>
      </div>
      {/* 檢查是否上鎖 */}
      {room.isLock && (
        <div className={cn("absolute z-3 -left-[10px] -top-[10px]")}>
          {LockIcon()}
        </div>
      )}
    </div>
  );
};

export default RoomCard;
