import { cn } from "@/lib/utils";
import { Room, RoomType, getRooms } from "@/requests/rooms";
import useRequest from "@/hooks/useRequest";
import usePagination from "@/hooks/usePagination";
import Button from "@/components/shared/Button";
import {
  RoomsList,
  RoomsListTitle,
  RoomsListWrapper,
} from "@/components/rooms/RoomsList";
import RoomCard from "@/components/rooms/RoomCard";
import { FC, useEffect, useState } from "react";

type Props = {
  status: RoomType;
};
const RoomsListView: FC<Props> = ({ status }) => {
  const [roomStatus, setRoomStatus] = useState<RoomType>(status);
  const { fetch } = useRequest();
  const {
    nextPage,
    backPage,
    setPerPage,
    data,
    loading,
    isError,
    errorMessage,
  } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getRooms({ page, perPage, status: roomStatus })),
    defaultPerPage: 20,
  });
  const [selectedRoomId, setSelectedRoomId] = useState<Room["id"]>("");
  const onSelectedRoomId = (id: string) => setSelectedRoomId(id);

  const nextPerPage = () => {
    setPerPage(10);
  };

  const backPerPage = () => {
    setPerPage(-10);
  };

  useEffect(() => {
    setRoomStatus(status);
  }, [status]);

  const Pagination = () => {
    return (
      <div className="flex justify-center items-center gap-2">
        <Button onClick={backPage}>上一頁</Button>
        <Button onClick={nextPage}>下一頁</Button>
        <Button onClick={nextPerPage}>我要+10筆</Button>
        <Button onClick={backPerPage}>我要-10筆</Button>
      </div>
    );
  };

  if (loading)
    return <div className="py-10 text-white text-center">Loading...</div>;
  if (isError)
    return (
      <div className="flex flex-col py-5 text-rose-500 text-center">
        Response Error: {errorMessage}
      </div>
    );

  return (
    <RoomsList>
      {/* <RoomsListTitle>
        {status === "WAITING" ? "正在等待玩家配對" : "遊戲已開始"}
      </RoomsListTitle> */}
      <RoomsListWrapper>
        {data.length > 0 &&
          data.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              active={room.id === selectedRoomId}
              onClick={onSelectedRoomId}
            />
          ))}
      </RoomsListWrapper>
      <Pagination />
    </RoomsList>
  );
};

export default RoomsListView;
