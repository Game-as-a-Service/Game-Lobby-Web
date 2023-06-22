import { FC, useState } from "react";
import { Room, RoomType, getRooms } from "@/requests/rooms";
import useRequest from "@/hooks/useRequest";
import usePagination from "@/hooks/usePagination";
import Button from "@/components/shared/Button";
import { RoomsList, RoomsListWrapper } from "@/components/rooms/RoomsList";
import RoomCard from "@/components/rooms/RoomCard";
import EnterPrivateRoomModal from "@/components/lobby/EnterPrivateRoomModal";

type Props = {
  status: RoomType;
};
const RoomsListView: FC<Props> = ({ status }) => {
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
      fetch(getRooms({ page, perPage, status })),
    defaultPerPage: 20,
  });
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const onSelectedRoom = (id: string) => {
    const targetRoom = data.find((room) => room.id === id);
    setSelectedRoom(targetRoom);
  };

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

  if (loading)
    return <div className="py-10 text-white text-center">Loading...</div>;
  if (isError)
    return (
      <div className="flex flex-col py-5 text-rose-500 text-center">
        Response Error: {errorMessage}
      </div>
    );

  return (
    <>
      <RoomsList>
        <RoomsListWrapper>
          {data.length > 0 &&
            data.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                active={room.id === selectedRoom?.id}
                onClick={onSelectedRoom}
              />
            ))}
        </RoomsListWrapper>
        <Pagination />
      </RoomsList>

      {selectedRoom && selectedRoom.isLocked && (
        <EnterPrivateRoomModal
          roomId={selectedRoom.id}
          onClose={() => setSelectedRoom(undefined)}
        />
      )}
    </>
  );
};

export default RoomsListView;
