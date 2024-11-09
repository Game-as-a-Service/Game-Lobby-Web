import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { RoomType } from "@/requests/rooms";
import { RoomList } from "@/features/room";
import Tabs, { TabItemType } from "@/components/shared/Tabs";

const Rooms = () => {
  const { t } = useTranslation("rooms");

  const tabs: TabItemType<RoomType>[] = [
    {
      tabKey: RoomType.WAITING,
      label: t("rooms_waiting"),
    },
    {
      tabKey: RoomType.PLAYING,
      label: t("rooms_playing"),
    },
  ];

  return (
    <div className="pb-5 px-6">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomType.WAITING}
        renderTabPaneContent={RoomList}
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
