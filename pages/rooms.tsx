import { RoomType } from "@/requests/rooms";
import RoomsListView from "@/containers/room/RoomListView";
import Tabs from "@/components/shared/Tabs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";

type TabsProps = {
  key: RoomType;
  label: string;
}[];

const Rooms = () => {
  const { t } = useTranslation("rooms");

  const tabs: TabsProps = [
    {
      key: RoomType.WAITING,
      label: t("rooms_waiting"),
    },
    {
      key: RoomType.PLAYING,
      label: t("rooms_playing"),
    },
  ];

  return (
    <div className="bg-dark29 rounded-[10px] py-5 px-6 h-full">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomType.WAITING}
        size="large"
        renderTabPaneContent={(currentTab) => (
          <RoomsListView status={currentTab.key} key={currentTab.key} />
        )}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["rooms"])),
    },
  };
};

export default Rooms;
