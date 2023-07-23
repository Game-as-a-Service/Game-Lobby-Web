import { ClipboardEvent, FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";

import {
  Room,
  RoomEntryError,
  RoomType,
  getRooms,
  postRoomEntry,
} from "@/requests/rooms";
import Button from "@/components/shared/Button";
import RoomCard from "@/components/rooms/RoomCard";
import EnterPrivateRoomModal from "@/components/lobby/EnterPrivateRoomModal";
import { RoomsList, RoomsListWrapper } from "@/components/rooms/RoomsList";
import useRequest from "@/hooks/useRequest";
import usePagination from "@/hooks/usePagination";
import usePopup from "@/hooks/usePopup";

type Props = {
  status: RoomType;
};

const INIT_PASSWORD = ["", "", "", ""];

const RoomsListView: FC<Props> = ({ status }) => {
  const { t } = useTranslation("rooms");
  const { fetch } = useRequest();
  const { nextPage, backPage, data, loading, isError, errorMessage } =
    usePagination({
      source: (page: number, perPage: number) =>
        fetch(getRooms({ page, perPage, status })),
      defaultPerPage: 20,
    });
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [passwordValues, setPasswordValues] = useState(INIT_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { Popup, firePopup } = usePopup();

  const onSelectedRoom = (id: string) => {
    const targetRoom = data.find((room) => room.id === id);

    if (targetRoom?.currentPlayers === targetRoom?.maxPlayers) {
      firePopup({ title: t("room_is_full") });
      return;
    }

    setSelectedRoom(targetRoom);
  };

  const handleClose = () => {
    setPasswordValues(INIT_PASSWORD);
    setSelectedRoom(undefined);
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const pastePassword = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .split("");

    pastePassword.length = 4;

    setPasswordValues(Array.from(pastePassword, (text) => text ?? ""));
  };

  const handleValues = (values: string[]) => {
    setPasswordValues(values);
  };

  useEffect(() => {
    async function fetchRoomEntry(_roomId: string) {
      setIsLoading(true);

      fetch(postRoomEntry(_roomId, passwordValues.join("")))
        .then(() => {
          router.push(`/rooms/${_roomId}`);
        })
        .catch((err: AxiosError<RoomEntryError>) => {
          const msg = err.response?.data.message.replaceAll(" ", "_");
          if (!msg) return firePopup({ title: "error!" });
          firePopup({ title: t(msg) });
        })
        .finally(() => {
          // setSelectedRoom(undefined);
          setIsLoading(false);
          setPasswordValues(INIT_PASSWORD);
        });
    }

    if (!selectedRoom || isLoading) return;
    if (!selectedRoom.isLocked || passwordValues.every((char) => char !== "")) {
      fetchRoomEntry(selectedRoom.id);
    }
  }, [selectedRoom, passwordValues, isLoading, router, fetch]);

  const Pagination = () => {
    return (
      <div className="flex justify-center items-center gap-2">
        <Button onClick={backPage}>上一頁</Button>
        <Button onClick={nextPage}>下一頁</Button>
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
            data.map((_room) => (
              <RoomCard
                key={_room.id}
                room={_room}
                active={_room.id === selectedRoom?.id}
                onClick={onSelectedRoom}
              />
            ))}
        </RoomsListWrapper>
        <Pagination />
      </RoomsList>

      <EnterPrivateRoomModal
        isOpen={!!selectedRoom?.isLocked && !!selectedRoom?.id}
        loading={isLoading}
        passwordValues={passwordValues}
        setPasswordValues={handleValues}
        onClose={handleClose}
        onPaste={handlePaste}
      />
      <Popup />
    </>
  );
};

export default RoomsListView;
