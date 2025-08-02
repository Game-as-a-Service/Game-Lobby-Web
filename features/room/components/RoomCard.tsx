import { useState, useCallback } from "react";
import type { RoomViewModel, Game } from "@/services/api";

import Image from "@/components/shared/Image";
import Button, { ButtonSize } from "@/components/shared/Button";
import { useJoinRoom } from "@/services/api";

// 擴展 Game 類型以包含 img 屬性
type EnhancedGame = Game & { img?: string };
type EnhancedRoom = Omit<RoomViewModel, "game"> & { game: EnhancedGame };

interface RoomsCardProps {
  room: EnhancedRoom;
  onClick: () => void;
}

function RoomCard({ room, onClick }: Readonly<RoomsCardProps>) {
  const joinRoomMutation = useJoinRoom(room.id);
  const { trigger: handleJoinRoom } = joinRoomMutation;
  const lackTotalPlayers = room.maxPlayers - room.currentPlayers;

  const handleClick = () => {
    onClick();
    if (room.isLocked) return;
    handleJoinRoom({});
  };

  return (
    <div className="bg-primary-700/40 rounded-2xl">
      <div className="flex p-4 gap-4 text-primary-50">
        <Image
          className="w-16 h-16 rounded-lg object-cover"
          src={room.game.img}
          alt={room.game.name}
          width={68}
          height={68}
        />
        <div className="overflow-hidden">
          <h3 className="mb-2 text-2xl truncate">{room.game.name}</h3>
          <h4 className="text-base truncate">{room.name}</h4>
        </div>
      </div>
      <footer className="flex justify-between px-4 py-2 rounded-b-2xl bg-primary-700/40 text-primary-300 overflow-hidden">
        {lackTotalPlayers > 0 ? (
          <div className="truncate">
            <span className="text-secondary-300">
              剩餘 {lackTotalPlayers} 個位置
            </span>
            <span> / {room.maxPlayers} 人</span>
          </div>
        ) : (
          <div className="truncate">人數已滿</div>
        )}
        <Button
          variant="highlight"
          size={ButtonSize.SMALL}
          onClick={handleClick}
        >
          加入
        </Button>
      </footer>
    </div>
  );
}

export default RoomCard;
