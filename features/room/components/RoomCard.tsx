import type {
  RoomViewModel,
  Game,
  GameRegistrationViewModel,
} from "@/services/api";

import { useState } from "react";
import { useRouter } from "next/router";
import Image from "@/components/shared/Image";
import Button, { ButtonSize } from "@/components/shared/Button";
import { useJoinRoom } from "@/services/api";
import { useCurrentUser } from "@/contexts/auth";
import Modal from "@/components/shared/Modal";
import JoinLockRoomForm from "./JoinLockRoomForm";
import { useToast } from "@/components/shared/Toast";
import { getErrorMessage } from "@/services/api/swrConfig";

type EnhancedRoom = RoomViewModel & {
  gameDetail?: GameRegistrationViewModel;
};

interface RoomsCardProps {
  room: EnhancedRoom;
}

function RoomCard({ room }: Readonly<RoomsCardProps>) {
  const { trigger: handleJoinRoom } = useJoinRoom(room.id);
  const { currentUser } = useCurrentUser();
  const toast = useToast();
  const lackTotalPlayers = room.maxPlayers - room.currentPlayers;
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navigateToRoom = () => navigate.push(`/rooms/${room.id}`);

  const handleClick = () => {
    if (room.id === currentUser?.currentGameRoomId) {
      navigateToRoom();
      return;
    }
    if (room.isLocked) {
      setIsOpen(true);
    } else {
      handleJoinRoom({})
        .then(navigateToRoom)
        .catch((error) => {
          toast({ state: "error", children: getErrorMessage(error) });
        });
    }
  };

  return (
    <>
      <div className="bg-primary-700/40 rounded-2xl">
        <div className="flex p-4 gap-4 text-primary-50">
          <Image
            className="w-16 h-16 rounded-lg object-cover"
            src={room.gameDetail?.img || "/images/game-default-cover.png"}
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

      <Modal
        title="私人房間"
        isOpen={isOpen}
        size="medium"
        onClose={() => setIsOpen(false)}
      >
        {room && (
          <JoinLockRoomForm id={room.id}>
            <div className="flex mb-4 gap-4 text-primary-50">
              <Image
                className="w-12 h-12 rounded-lg object-cover"
                src={room.gameDetail?.img || "/images/game-default-cover.png"}
                alt={room.game.name}
                width={48}
                height={48}
              />
              <div className="overflow-hidden">
                <h3 className="truncate">{room.game.name}</h3>
                <h4 className="truncate">{room.name}</h4>
              </div>
            </div>
          </JoinLockRoomForm>
        )}
      </Modal>
    </>
  );
}

export default RoomCard;
