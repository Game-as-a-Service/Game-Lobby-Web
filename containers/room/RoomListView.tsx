import { ClipboardEvent, FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";

import {
  RoomType,
  getRooms,
  postRoomEntry,
  getRoomInfoEndpoint,
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
  const [roomId, setRoomId] = useState<string | null>(null);
  const [passwordValues, setPasswordValues] = useState(INIT_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const { Popup, firePopup } = usePopup();
  const router = useRouter();
  const isLocked = data.find((room) => room.id === roomId)?.isLocked;

  const handleClose = () => {
    setPasswordValues(INIT_PASSWORD);
    setRoomId(null);
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const pastePassword = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .split("");

    pastePassword.length = 4;

    setPasswordValues(Array.from(pastePassword, (text) => text ?? ""));
  };

  useEffect(() => {
    async function fetchRoomEntry(_roomId: string) {
      setIsLoading(true);

      if (await fetch(getRoomInfoEndpoint(_roomId)).catch(() => {})) {
        router.push(`/rooms/${_roomId}`);
        return;
      }

      try {
        await fetch(postRoomEntry(_roomId, passwordValues.join("")));
        router.push(`/rooms/${_roomId}`);
      } catch (err) {
        if (err instanceof AxiosError) {
          const msg = err.response?.data.message.replaceAll(" ", "_");
          if (!msg) return firePopup({ title: "error!" });
          firePopup({ title: t(msg) });
        }
      } finally {
        setPasswordValues(INIT_PASSWORD);
        setIsLoading(false);
      }
    }

    if (!roomId || isLoading) return;
    if (!isLocked || passwordValues.every((char) => char !== "")) {
      fetchRoomEntry(roomId);
    }
  }, [roomId, passwordValues, isLoading, router, fetch, firePopup, t]);

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
                active={_room.id === roomId}
                onClick={setRoomId}
              />
            ))}
        </RoomsListWrapper>
        <Pagination />
      </RoomsList>

      <EnterPrivateRoomModal
        isOpen={!!isLocked && !!roomId}
        loading={isLoading}
        passwordValues={passwordValues}
        setPasswordValues={setPasswordValues}
        onClose={handleClose}
        onPaste={handlePaste}
      />
      <Popup />
    </>
  );
};

export default RoomsListView;
