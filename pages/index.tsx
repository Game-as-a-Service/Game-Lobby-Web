import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ReactEventHandler, useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AxiosError } from "axios";

import Button from "@/components/shared/Button/v2";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import CarouselV2 from "@/components/shared/Carousel/v2";
import SearchBar from "@/components/shared/SearchBar";
import Tabs, { TabItemType } from "@/components/shared/Tabs";
import { fastJoinGameEndpoint } from "@/requests/rooms";
import { GameType, getAllGamesEndpoint } from "@/requests/games";
import useRequest from "@/hooks/useRequest";
import useUser from "@/hooks/useUser";
import { useToast } from "@/components/shared/Toast";
import Icon from "@/components/shared/Icon";
import gameDefaultCoverImg from "@/public/images/game-default-cover.png";
import { CarouselItemProps } from "@/components/shared/Carousel/v2/Carousel.type";
import { cn } from "@/lib/utils";

const onImageError: ReactEventHandler<HTMLImageElement> = (e) => {
  if (e.target instanceof HTMLImageElement) {
    e.target.src = gameDefaultCoverImg.src;
  }
};

function CarouselCard({
  showIndex,
  index,
  id,
  img,
  name,
  createdOn,
  maxPlayers,
  minPlayers,
}: Readonly<CarouselItemProps<GameType>>) {
  // 待重構將邏輯統一管理
  const { fetch } = useRequest();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const { updateRoomId } = useUser();
  const [open, setOpen] = useState(false);
  const tabIndex = index === showIndex ? 0 : -1;

  const handleFastJoin = async () => {
    try {
      setIsLoading(true);
      const { roomId } = await fetch(fastJoinGameEndpoint(id));
      router.push(`/rooms/${roomId}`);
      updateRoomId(roomId);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(
          { state: "error", children: error.response?.data.message },
          { position: "top" }
        );
      } else {
        toast(
          { state: "error", children: `無法預期的錯誤： ${error}` },
          { position: "top" }
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex text-white px-12 gap-4"
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative flex items-end justify-end flex-[60%]">
        <Image
          src={img || gameDefaultCoverImg.src}
          alt={name}
          draggable={false}
          priority
          fill
          className="object-cover"
          onError={onImageError}
        />
        <div className="m-4 flex gap-4">
          <Button
            variant="primaryTransparent"
            className="flex"
            disabled={isLoading}
            tabIndex={tabIndex}
            onClick={handleFastJoin}
          >
            <Icon name="Gamepad" className="w-6 h-6" />
            快速遊戲
          </Button>
          <div className="relative">
            <Button
              variant="primaryTransparent"
              className="w-11 h-11 p-0"
              tabIndex={tabIndex}
              onClick={() => setOpen((pre) => !pre)}
            >
              <Icon name="Menu" className="w-6 h-6 rotate-90" />
            </Button>
            <div
              className={cn(
                "absolute bottom-full right-0 mb-2 transition-transform origin-[calc(100%-22px)_bottom] z-20",
                !open && "scale-0"
              )}
            >
              <ul className="py-4 frosted-shadow-box text-primary-800 bg-primary-200/60 whitespace-nowrap rounded-lg">
                <li>
                  <Link
                    href="/rooms"
                    className="block w-full text-left px-4 py-1 hover:bg-primary-900/20 cursor-pointer"
                    tabIndex={open ? tabIndex : -1}
                  >
                    加入現有房間
                  </Link>
                </li>
                <li>
                  <CreateRoomModal tabIndex={open ? tabIndex : -1} />
                </li>
                <li>
                  <button
                    type="button"
                    className="block w-full text-left px-4 py-1 hover:bg-primary-900/20 cursor-pointer"
                    onClick={() => alert("遊戲詳細介紹頁尚未實作，敬請期待")}
                    onKeyDown={() => alert("遊戲詳細介紹頁尚未實作，敬請期待")}
                    tabIndex={open ? tabIndex : -1}
                  >
                    遊戲詳情
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[40%] p-4 rounded-lg bg-primary-50/8">
        <div className="text-xs text-primary-300">Game Name</div>
        <div className="text-xl text-primary-100">{name}</div>
        <div className="flex gap-6 mb-2 text-xs text-primary-300">
          <div className="flex-1 flex items-center gap-1.5">
            <span>4.8</span>
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <Icon name="Star" className="w-3 h-3 fill-yellow-400" />
            <span>(66)</span>
          </div>
          <time className="flex-1 flex items-center gap-1">
            <Icon name="Calendar" className="w-3 h-3" />
            {createdOn.slice(0, 10).replace(/-/g, ".")}
          </time>
        </div>
        <div className="mb-3">
          <ul className="flex gap-3">
            <li className="relative w-16 h-10">
              {img && (
                <Image
                  src={img}
                  alt={name}
                  draggable={false}
                  priority
                  fill
                  className="object-cover"
                  onError={onImageError}
                />
              )}
            </li>
          </ul>
        </div>
        <div className="mb-3 text-xs text-primary-50 h-12">暫無描述</div>
        <div>
          <ul className="flex flex-wrap gap-2 text-xs h-12">
            {maxPlayers === 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                單人遊戲
              </li>
            )}
            {maxPlayers === minPlayers && maxPlayers > 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                {maxPlayers} 人遊戲
              </li>
            )}
            {maxPlayers !== minPlayers && maxPlayers > 1 && (
              <li className="bg-primary-800 text-primary-300 rounded-full px-2 py-0.5 h-fit">
                {minPlayers} - {maxPlayers} 玩家
              </li>
            )}
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
      <ul className="mt-6 grid grid-cols-4 gap-4">
        {data.map((game) => (
          <li key={game.id}>
            <div
              className="cursor-pointer"
              onClick={() => alert("遊戲詳細介紹頁尚未實作，敬請期待")}
              onKeyDown={() => alert("遊戲詳細介紹頁尚未實作，敬請期待")}
            >
              <picture className="relative aspect-game-cover overflow-hidden">
                <Image
                  src={game.img || gameDefaultCoverImg.src}
                  alt={game.name}
                  draggable={false}
                  priority
                  fill
                  className="object-cover"
                  onError={onImageError}
                />
              </picture>
              <h2>{game.name}</h2>
            </div>
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
