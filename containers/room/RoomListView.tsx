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
import { FC, useState } from "react";

type Props = {
  status: RoomType;
};
const RoomsListView: FC<Props> = ({ status }) => {
  const { fetch } = useRequest();
  const { nextPage, backPage, setPerPage, data } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getRooms({ page, perPage, status })),
    defaultPerPage: 10,
  });
  const [selectedRoomId, setSelectedRoomId] = useState<Room["id"]>("");
  const onSelectedRoomId = (id: string) => setSelectedRoomId(id);

  const nextPerPage = () => {
    setPerPage(10);
  };

  const backPerPage = () => {
    setPerPage(-10);
  };

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

  return (
    <RoomsList>
      <RoomsListTitle>
        {status === "WAITING" ? "正在等待玩家配對" : "遊戲已開始"}
      </RoomsListTitle>
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
