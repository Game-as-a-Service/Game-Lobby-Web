import { RoomType } from "@/requests/rooms";
import RoomsListView from "@/containers/room/RoomListView";
import Tabs from "@/components/shared/Tabs";

type TabsProps = {
  key: RoomType;
  label: string;
}[];

const tabs: TabsProps = [
  {
    key: RoomType.WAITING,
    label: "正在等待玩家配對",
  },
  {
    key: RoomType.PLAYING,
    label: "遊戲已開始",
  },
];
const Rooms = () => {
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

export default Rooms;
