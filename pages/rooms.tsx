import { useState, useEffect, ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useRequest from "@/shared/hooks/useRequest";
import { Room, getRoomsEndpoint } from "@/requests/rooms";

type RoomCardProps = {
  room: Room;
  onClick: () => void;
};

const RoomCard = ({ room, onClick }: RoomCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "room__card",
        "cursor-pointer  hover:border-blue-500 transition-all duration-300",
        "grid grid-cols-[34px_1fr] gap-[12px] rounded-[10px] border-2 border-[#1E1F22] py-[11px] pl-[11px] pr-[20px]"
      )}
      onClick={onClick}
    >
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
        <h3 className={cn("text-white")}>{room.name}</h3>
        <div className={cn("text-white")}>
          <span className={cn("text-[var(--blue)]")}>{room.maxPlayers}</span>
          人房,還缺
          <span className={cn("text-[var(--blue)]")}>2</span>人
        </div>
      </div>
    </div>
  );
};

const useGetRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const { fetch } = useRequest();

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // send status for getRoomsEndpoint
      const endpoint = await fetch(getRoomsEndpoint({ status: "WAITING" }));
      setRooms((prevRooms) => [...prevRooms, ...endpoint.rooms]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { rooms, isLoading, error };
};

const Rooms = () => {
  const { rooms, isLoading, error } = useGetRooms();
  const [selectedRoom, setSelectedRoom] = useState<Room>({} as Room);
  const [page, setPage] = useState(1);

  const onSelected = (room: Room) => {
    setSelectedRoom(room);
  };

  if (isLoading) {
    return (
      <>
        {/** Loading IMG */}
        <p>loading</p>
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "bg-[#292A2D] rounded-[10px] py-[34px] px-[24px] m-[16px]"
        )}
      >
        {rooms.length == 0 && <p>目前沒有房間</p>}

        <h2
          className={cn(
            "text-bold border-l-4 border-[var(--blue)] pl-2 font-black"
          )}
        >
          正在等待玩家配對
        </h2>
        <div className={cn("mx-auto grid grid-auto-fit gap-2.5 my-5")}>
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} onClick={() => onSelected(room)} />
          ))}
        </div>
      </div>
    </>
  );
};
Rooms.getLayout = (page: ReactElement) => page;
export default Rooms;
