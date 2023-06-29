import { useEffect, useState } from "react";
import Button from "../Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import { cn } from "@/lib/utils";

const CardActions: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonClass = "w-full rounded-none bg-dark1E hover:bg-blue2f";

  useEffect(() => {}, [isOpen]);
  return (
    <>
      <Button
        className={cn("__create__room__", buttonClass)}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="create"
      >
        開設新房間
      </Button>
      <Button className={cn("__join__room__", buttonClass)} data-testid="join">
        加入現有房間
      </Button>
      <Button className={cn("__info__room__", buttonClass)} data-testid="info">
        遊戲詳情
      </Button>

      {isOpen && (
        <CreateRoomModal open={true} onClose={(open) => setIsOpen(open)} />
      )}
    </>
  );
};

export default CardActions;
