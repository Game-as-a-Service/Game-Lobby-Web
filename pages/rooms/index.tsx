import { useState } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@/components/shared/Button";
import SearchBar from "@/components/shared/SearchBar";
import Image from "@/components/shared/Image";
import Modal from "@/components/shared/Modal";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import {
  useFindGameRegistrations,
  useGetRooms,
  type GetRoomsParams,
  type RoomViewModel,
  type Game,
} from "@/services/api";
import { JoinLockRoomForm, RoomCard } from "@/features/room";

type RoomStatus = "WAITING" | "PLAYING";

// 擴展 Game 類型以包含 imgUrl
type EnhancedGame = Game & { imgUrl?: string };
type EnhancedRoom = Omit<RoomViewModel, "game"> & { game: EnhancedGame };

type RoomType = RoomStatus;

const RoomTypeMap = {
  WAITING: "WAITING" as const,
  PLAYING: "PLAYING" as const,
};

function TabPaneContent({ tabKey }: Readonly<TabItemType<RoomType>>) {
  const { data: gameList = [] } = useFindGameRegistrations();
  const [room, setRoom] = useState<EnhancedRoom | null>(null);

  const {
    data: roomsResponse,
    error,
    isLoading,
  } = useGetRooms({
    status: tabKey,
    page: 0,
    perPage: 20,
  });

  if (isLoading) return <div className="my-5">Loading...</div>;
  if (error) return <div className="my-5">Error loading rooms</div>;

  const rooms = roomsResponse?.rooms || [];

  return (
    <>
      <ul className="grid grid-cols-3 gap-5 my-5">
        {rooms
          .map((room) => {
            const gameDetail = gameList?.find(
              (game) => game.id === room.game.id
            );
            return {
              ...room,
              game: {
                ...room.game,
                imgUrl: gameDetail?.img || "",
              },
            };
          })
          .map((room) => (
            <li key={room.id}>
              <RoomCard
                room={{
                  ...room,
                  isLocked: room.isLocked,
                }}
                onClick={() => setRoom(room)}
              />
            </li>
          ))}
      </ul>

      <Modal
        title="私人房間"
        isOpen={!!room?.isLocked}
        onClose={() => setRoom(null)}
        size="medium"
      >
        {room && (
          <JoinLockRoomForm id={room.id}>
            <div className="flex mb-4 gap-4 text-primary-50">
              <Image
                className="w-12 h-12 rounded-lg object-cover"
                src={room.game.imgUrl || "/images/game-default-cover.png"}
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

const Rooms: NextPage = () => {
  const { t } = useTranslation();

  const tabs: TabItemType<RoomType>[] = [
    {
      tabKey: RoomTypeMap.WAITING,
      label: t("rooms_waiting"),
    },
    {
      tabKey: RoomTypeMap.PLAYING,
      label: t("rooms_playing"),
    },
  ];

  return (
    <div className="pb-5 px-6">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomTypeMap.WAITING}
        renderTabPaneContent={TabPaneContent}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW")),
    },
  };
};

export default Rooms;
