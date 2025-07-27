import type { Game } from "@/api";

import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Carousel from "@/components/shared/Carousel";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { CarouselItemProps } from "@/components/shared/Carousel/Carousel.type";
import { GameCardDetailed, GameCardSimple, useGames } from "@/features/game";
import { GameRoomActions } from "@/features/room";

enum TabKey {
  HOT = "hot",
  NEW = "new",
  LAST = "last",
  GOOD = "good",
  COLLECT = "collect",
}

function CarouselCard({
  showIndex,
  index,
  ...gameProps
}: Readonly<CarouselItemProps<Game>>) {
  return (
    <GameCardDetailed {...gameProps}>
      <GameRoomActions tabIndex={index === showIndex ? 0 : -1} {...gameProps} />
    </GameCardDetailed>
  );
}

function TabPaneContent({ tabKey }: Readonly<TabItemType<TabKey>>) {
  const { data: gameList } = useGames();

  if ([TabKey.HOT, TabKey.NEW].includes(tabKey)) {
    const data =
      tabKey === TabKey.HOT
        ? gameList
        : gameList
            ?.concat()
            .sort(
              (a, b) =>
                new Date(b.createdOn).getTime() -
                new Date(a.createdOn).getTime()
            );

    return (
      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((game) => (
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
}

export default function Home() {
  const { data: gameList } = useGames();

  const tabs: TabItemType<TabKey>[] = [
    { tabKey: TabKey.HOT, label: "熱門遊戲" },
    { tabKey: TabKey.NEW, label: "最新遊戲" },
    { tabKey: TabKey.LAST, label: "上次遊玩" },
    { tabKey: TabKey.GOOD, label: "好評遊戲" },
    { tabKey: TabKey.COLLECT, label: "收藏遊戲" },
  ];

  return (
    <div className="max-w-[1036px] mx-auto px-6">
      <div>
        <Carousel items={gameList || []} Component={CarouselCard} />
      </div>
      <div className="mt-6">
        <Tabs tabs={tabs} renderTabPaneContent={TabPaneContent} />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW")),
    },
  };
};
