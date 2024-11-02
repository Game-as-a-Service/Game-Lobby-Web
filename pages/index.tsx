import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import CarouselV2 from "@/components/shared/Carousel/v2";
import SearchBar from "@/components/shared/SearchBar";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { GameType, getAllGamesEndpoint } from "@/requests/games";
import useRequest from "@/hooks/useRequest";
import { CarouselItemProps } from "@/components/shared/Carousel/v2/Carousel.type";
import { GameCardDetailed, GameCardSimple } from "@/features/game";
import { GameRoomActions } from "@/features/room";

function CarouselCard({
  showIndex,
  index,
  ...gameProps
}: Readonly<CarouselItemProps<GameType>>) {
  return (
    <GameCardDetailed {...gameProps}>
      <GameRoomActions tabIndex={index === showIndex ? 0 : -1} {...gameProps} />
    </GameCardDetailed>
  );
}

enum TabKey {
  HOT = "hot",
  NEW = "new",
  LAST = "last",
  GOOD = "good",
  COLLECT = "collect",
}

const tabs: TabItemType<TabKey>[] = [
  { tabKey: TabKey.HOT, label: "熱門遊戲" },
  { tabKey: TabKey.NEW, label: "最新遊戲" },
  { tabKey: TabKey.LAST, label: "上次遊玩" },
  { tabKey: TabKey.GOOD, label: "好評遊戲" },
  { tabKey: TabKey.COLLECT, label: "收藏遊戲" },
];

const TabPaneContent = ({
  tabKey,
  gameList,
}: TabItemType<TabKey> & { gameList: GameType[] }) => {
  if ([TabKey.HOT, TabKey.NEW].includes(tabKey)) {
    const data =
      tabKey === TabKey.HOT
        ? gameList
        : gameList
            .concat()
            .sort(
              (a, b) =>
                new Date(b.createdOn).getTime() -
                new Date(a.createdOn).getTime()
            );

    return (
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((game) => (
          <li key={game.id}>
            <GameCardSimple {...game}>
              <GameRoomActions {...game} />
            </GameCardSimple>
          </li>
        ))}
      </ul>
    );
  }

  return <div className="mt-6">實作中...</div>;
};

export default function Home() {
  const { fetch } = useRequest();
  const [gameList, setGameList] = useState<GameType[]>([]);

  useEffect(() => {
    fetch(getAllGamesEndpoint()).then(setGameList);
  }, [fetch]);

  return (
    <div className="max-w-[1036px] mx-auto px-6">
      <div className="flex justify-center mb-6">
        <SearchBar
          leftSlot={
            <button type="button" className="pl-5 pr-2.5 px-4 text-primary-300">
              類型
            </button>
          }
        />
      </div>
      <div>
        <CarouselV2 items={gameList} Component={CarouselCard} />
      </div>
      <div className="mt-6">
        <Tabs
          tabs={tabs}
          renderTabPaneContent={(props) => (
            <TabPaneContent gameList={gameList} {...props} />
          )}
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["rooms"])),
    },
  };
};
