import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import { mockCarouselItems } from "@/components/shared/Carousel";
import CarouselV2 from "@/components/shared/Carousel/v2";
import FastJoinButton from "@/components/lobby/FastJoinButton";
import SearchBar from "@/components/shared/SearchBar";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { getAllGamesEndpoint } from "@/requests/games";
import useRequest from "@/hooks/useRequest";

function CarouselCard({
  imgUrl,
  imgAlt,
}: Readonly<(typeof mockCarouselItems)[number]>) {
  return (
    <div className="flex text-white px-12 gap-4">
      <div className="relative flex-[60%]">
        <Image src={imgUrl} alt={imgAlt} draggable={false} priority fill />
      </div>
      <div className="flex-[40%] p-4 rounded-lg bg-primary-50/8">
        <div className="text-xs text-primary-300">Massive Monster</div>
        <div className="text-xl text-primary-100">{imgAlt}</div>
        <div className="flex mb-2 text-xs text-primary-300">
          <div className="flex-1">4.6 ＊ ＊ ＊ ＊ ＊ (14)</div>
          <time className="flex-1">2023.08.25</time>
        </div>
        <div className="mb-3">
          <ul className="flex gap-3">
            <li className="relative w-16 h-10">
              <Image
                src="https://images.unsplash.com/photo-1533237264985-ee62f6d342bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
                alt={imgAlt}
                draggable={false}
                priority
                fill
              />
            </li>
            <li className="relative w-16 h-10">
              <Image
                src="https://images.unsplash.com/photo-1613160717888-faa82cdb8a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt={imgAlt}
                draggable={false}
                priority
                fill
              />
            </li>
            <li className="relative w-16 h-10">
              <Image
                src="https://images.unsplash.com/photo-1601987177651-8edfe6c20009?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt={imgAlt}
                draggable={false}
                priority
                fill
              />
            </li>
            <li className="relative w-16 h-10">
              <Image
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt={imgAlt}
                draggable={false}
                priority
                fill
              />
            </li>
          </ul>
        </div>
        <div className="mb-3 text-xs text-primary-50">
          《AZUL》是強手棋類休閒遊戲，在遊戲中，你可以任意選擇比賽地圖、參賽角色和組隊方式，使用卡片等方式賺取金錢，最終取得比賽勝利。
        </div>
        <div>
          <ul className="flex flex-wrap gap-2 text-xs">
            <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5">
              回合制
            </li>
            <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5">
              第三人稱
            </li>
            <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5">
              策略型
            </li>
            <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5">
              玩家對戰
            </li>
            <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5">
              輕鬆休閒
            </li>
          </ul>
        </div>
      </div>
    </div>
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

const TabPaneContent = (tabItem: TabItemType<TabKey>) => {
  const { t } = useTranslation("rooms");
  if (tabItem.tabKey === TabKey.HOT) {
    return (
      <div className="my-6 flex gap-3">
        <CreateRoomModal />
        <Button component={Link} href="/rooms">
          {t("rooms_list")}
        </Button>
        <FastJoinButton />
      </div>
    );
  }
  return <div>實作中...</div>;
};

export default function Home() {
  const { fetch } = useRequest();
  const [gameList, setGameList] = useState<typeof mockCarouselItems>([]);

  useEffect(() => {
    async function handleGetAllGame() {
      const result = await fetch(getAllGamesEndpoint());
      setGameList(
        result.map((gameItem) => ({
          link: `/rooms/${gameItem.id}`,
          imgUrl: gameItem.img,
          imgAlt: gameItem.name,
        }))
      );
    }
    handleGetAllGame();
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
        <CarouselV2
          items={gameList}
          uniqueKey="imgAlt"
          Component={CarouselCard}
        />
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
      ...(await serverSideTranslations(locale ?? "zh-TW", ["rooms"])),
    },
  };
};
