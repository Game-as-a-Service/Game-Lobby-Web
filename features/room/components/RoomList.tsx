import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";

import {
  RoomType,
  getRooms,
  postRoomEntry,
  getRoomInfoEndpoint,
} from "@/requests/rooms";
import { JoinLockRoomForm, RoomCard } from "@/features/room";
import useRequest from "@/hooks/useRequest";
import usePagination from "@/hooks/usePagination";
import useUser from "@/hooks/useUser";
import { useGameList } from "@/features/game";
import Modal from "@/components/shared/Modal";
import Cover from "@/components/shared/Cover";
import { useToast } from "@/components/shared/Toast";

interface RoomListProps {
  tabKey: RoomType;
}

function RoomList({ tabKey }: RoomListProps) {
  const { t } = useTranslation("rooms");
  const { fetch } = useRequest();
  const { updateRoomId } = useUser();
  const toast = useToast();
  const router = useRouter();
  const { data } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getRooms({ page, perPage, status: tabKey })),
    defaultPerPage: 20,
  });
  const gameList = useGameList();
  const rooms = useMemo(
    () =>
      Array.isArray(data)
        ? data.map((room) => ({
            ...room,
            game: {
              ...room.game,
              imgUrl:
                gameList.find((game) => game.id === room.game.id)?.img || "",
            },
          }))
        : [],
    [data, gameList]
  );
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const room = useMemo(
    () => rooms.find((room) => room.id === roomId),
    [roomId, rooms]
  );
  const isLocked = room?.isLocked;
  const isOpenPasswordModel = !!isLocked && !!roomId;

  const handleClose = () => {
    setRoomId(null);
    setIsLoading(false);
  };

  const fetchRoomEntry = useCallback(
    async (password: string | null = null) => {
      if (!roomId) return;

      setIsLoading(true);

      // Automatically enter the room if room information is accessible,
      // indicating the user is already in the room
      if (await fetch(getRoomInfoEndpoint(roomId)).catch(() => {})) {
        router.push(`/rooms/${roomId}`);
        updateRoomId(roomId);
        return;
      }

      try {
        await fetch(postRoomEntry(roomId, password));
        router.push(`/rooms/${roomId}`);
        updateRoomId(roomId);
        handleClose();
      } catch (err) {
        if (err instanceof AxiosError) {
          const msg = err.response?.data.message.replaceAll(" ", "_");
          if (!msg) return toast({ children: "error!", state: "error" });
          toast({ children: t(msg), state: "error" });
          setIsLoading(false);
          return Promise.reject(t(msg));
        }
      }
    },
    [roomId, fetch, router, t, toast, updateRoomId]
  );

  useEffect(() => {
    if (isLoading || isLocked) return;
    fetchRoomEntry();
  }, [isLoading, isLocked, fetchRoomEntry]);

  return (
    <>
      <ul className="grid grid-cols-3 gap-5 my-5">
        {rooms.map((_room) => (
          <li key={_room.id}>
            <RoomCard room={_room} onJoin={setRoomId} />
          </li>
        ))}
      </ul>

      <Modal
        title="私人房間"
        isOpen={isOpenPasswordModel}
        onClose={handleClose}
        size="medium"
      >
        <JoinLockRoomForm onSubmit={fetchRoomEntry}>
          {room && (
            <div className="flex mb-4 gap-4 text-primary-50">
              <Cover
                className="w-12 h-12 rounded-lg object-cover"
                src={room.game.imgUrl}
                alt={room.game.name}
                width={48}
                height={48}
              />
              <div className="overflow-hidden">
                <h3 className="truncate">{room.game.name}</h3>
                <h4 className="truncate">{room.name}</h4>
              </div>
            </div>
          )}
        </JoinLockRoomForm>
      </Modal>
    </>
  );
}

export default RoomList;
