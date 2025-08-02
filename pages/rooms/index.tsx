import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { useFindGameRegistrations, useGetRooms } from "@/services/api";
import { RoomCard } from "@/features/room";

enum RoomTypeEnum {
  WAITING = "WAITING",
  PLAYING = "PLAYING",
}

function TabPaneContent({ tabKey }: Readonly<TabItemType<RoomTypeEnum>>) {
  const { data: gameList = [] } = useFindGameRegistrations();

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
    <ul className="grid grid-cols-3 gap-5 my-5">
      {rooms
        .map((room) => {
          const gameDetail = gameList?.find((game) => game.id === room.game.id);
          return {
            ...room,
            gameDetail,
          };
        })
        .map((room) => (
          <li key={room.id}>
            <RoomCard room={room} />
          </li>
        ))}
    </ul>
  );
}

const Rooms: NextPage = () => {
  const { t } = useTranslation();

  const tabs: TabItemType<RoomTypeEnum>[] = [
    {
      tabKey: RoomTypeEnum.WAITING,
      label: t("rooms_waiting"),
    },
    {
      tabKey: RoomTypeEnum.PLAYING,
      label: t("rooms_playing"),
    },
  ];

  return (
    <div className="pb-5 px-6">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomTypeEnum.WAITING}
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
