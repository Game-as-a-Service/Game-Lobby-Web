import { ReactElement, useState } from "react";
import { RoomType } from "@/requests/rooms";
import RoomsListView from "@/containers/room/RoomListView";
import Tabs from "@/components/shared/Tabs";

const tabs = [
  {
    key: RoomType.WAITING as string,
    label: "正在等待玩家配對",
  },
  {
    key: RoomType.PLAYING as string,
    label: "遊戲已開始",
  },
];
const Rooms = () => {
  const [currentTab, setCurrentTab] = useState<RoomType>(RoomType.WAITING);

  return (
    <div className="bg-dark29 rounded-[10px] py-5 px-6 m-4 h-full">
      <Tabs
        tabs={tabs}
        defaultActiveKey={RoomType.WAITING}
        size="large"
        onChange={(key) => setCurrentTab(key as RoomType)}
        renderTabPaneContent={() => {
          return (
            <>
              {currentTab === RoomType.WAITING && (
                <RoomsListView status={currentTab} />
              )}
              {currentTab === RoomType.PLAYING && (
                <RoomsListView status={currentTab} />
              )}
            </>
          );
        }}
      />
    </div>
  );
};

Rooms.getLayout = (page: ReactElement) => page;
export default Rooms;
