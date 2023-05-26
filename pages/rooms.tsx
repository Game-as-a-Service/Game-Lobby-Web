import { useState, useEffect, useCallback, ReactElement } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useRequest from "@/shared/hooks/useRequest";
import { Room, getRoomsEndpoint } from "@/requests/rooms";
import Lock from "../public/images/lock.svg";

type RoomCardProps = {
  key: string;
  room: Room;
  active: boolean;
  onClick: () => void;
};

type RoomsListProps = {
  title: string;
  rooms: Room[];
  selectedRoom: Room;
  isLoading: boolean;
  isError: boolean;
  onSelected: (room: Room) => void;
};

// 遊戲房間資料
const RoomCard = ({ room, active, onClick }: RoomCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const LockIcon = () => <Lock className="w-5 h-5" />;

  return (
    <div
      className={cn(
        "room__card",
        "relative cursor-pointer hover:border-blue-500 transition-all duration-300",
        "grid grid-cols-[34px_1fr] gap-[12px] rounded-[10px] border-2 border-[#1E1F22] py-[11px] pl-[11px] pr-[20px]",
        {
          "border-blue-500": active,
        }
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
        <h3 className={cn("text-white truncate")}>{room.name}</h3>
        <div className={cn("text-white")}>
          <span className={cn("text-[var(--blue)]")}>{room.maxPlayers}</span>
          人房，還缺
          {/* API資料，缺少目前有幾人已加入房間 */}
          <span className={cn("text-[var(--blue)]")}>{2}</span>人
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

// 取得所有房間
const useGetRooms = (props: {
  status: "WAITING" | "PLAYING";
  offset: number;
  limit: number;
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState<any>(undefined);
  const { fetch } = useRequest();
  const { status, offset, limit } = props;

  useEffect(() => {
    getRooms();
  }, []);

  const getRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // send status for getRoomsEndpoint
      const endpoint = await fetch(getRoomsEndpoint({ status, offset, limit }));
      setRooms((prevRooms) => [...prevRooms, ...endpoint.rooms]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [fetch, status, offset, limit]);

  return { rooms, getRooms, isLoading, isError };
};

// 房間列表
const RoomList = ({
  title,
  rooms,
  selectedRoom,
  onSelected,
  isLoading,
  isError, // 不知道怎麼寫isError的處理內容
}: RoomsListProps) => {
  const listClass = cn(
    "grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-2.5 my-5"
  );

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
      <h2
        className={cn(
          "text-bold border-l-4 border-[var(--blue)] pl-2 font-black"
        )}
      >
        {title}
      </h2>

      {rooms.length == 0 && <p>目前沒有房間</p>}

      <div className={listClass}>
        {rooms.map((room: Room) => (
          <RoomCard
            key={room.id}
            room={room}
            active={room.id === selectedRoom.id}
            onClick={() => onSelected(room)}
          />
        ))}
      </div>
    </>
  );
};

// 遊戲房間頁面
const Rooms = () => {
  const [waitingOffset, setWaitingOffset] = useState(0);
  const [playingOffset, setPlayingOffset] = useState(0);
  const waitingList = useGetRooms({
    status: "WAITING",
    offset: waitingOffset,
    limit: 6,
  });
  const playingList = useGetRooms({
    status: "PLAYING",
    offset: playingOffset,
    limit: 6,
  });

  const [selectedRoom, setSelectedRoom] = useState<Room>({} as Room);

  const onSelected = (room: Room) => {
    setSelectedRoom(room);
  };

  return (
    <>
      <div
        className={cn(
          "bg-[#292A2D] rounded-[10px] py-[34px] px-[24px] m-[16px] h-[calc(100vh-34px)] overflow-hidden"
        )}
      >
        <RoomList
          title="正在等待玩家配對"
          {...waitingList}
          selectedRoom={selectedRoom}
          onSelected={onSelected}
        />

        <RoomList
          title="遊戲已開始"
          {...playingList}
          selectedRoom={selectedRoom}
          onSelected={onSelected}
        />
      </div>
    </>
  );
};

Rooms.getLayout = (page: ReactElement) => page;
export default Rooms;
