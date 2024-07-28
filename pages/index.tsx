import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";
import CarouselV2 from "@/components/shared/Carousel/v2";
import FastJoinButton from "@/components/lobby/FastJoinButton";
import SearchBar from "@/components/shared/SearchBar";

function CarouselCard({ imgUrl, imgAlt }: (typeof mockCarouselItems)[number]) {
  return (
    <div className="flex text-white px-10 gap-4">
      <div className="relative flex-[60%]">
        <Image
          src={imgUrl}
          alt={imgAlt ? imgAlt : ""}
          draggable={false}
          priority
          fill
        />
      </div>
      <div className="flex-[40%] p-4 rounded-lg bg-primary-50/8">
        <div className="text-xs">Massive Monster</div>
        <div className="text-xl">AZUL ({imgAlt})</div>
        <div className="flex mb-2 text-xs">
          <div className="flex-1">4.6 * * * * * (14)</div>
          <time className="flex-1">2023.08.25</time>
        </div>
        <div className="mb-3">
          <ul className="flex gap-3">
            <li className="border border-primary-100 w-16 h-10">img1</li>
            <li className="border border-primary-100 w-16 h-10">img2</li>
            <li className="border border-primary-100 w-16 h-10">img3</li>
          </ul>
        </div>
        <div className="mb-3 text-xs">
          《AZUL》是強手棋類休閒遊戲，在遊戲中，你可以任意選擇比賽地圖、參賽角色和組隊方式，使用卡片等方式賺取金錢，最終取得比賽勝利。
        </div>
        <div>
          <ul className="flex flex-wrap gap-2 text-xs">
            <li className="border border-primary-100 rounded-full px-1">
              回合制
            </li>
            <li className="border border-primary-100 rounded-full px-1">
              第三人稱
            </li>
            <li className="border border-primary-100 rounded-full px-1">
              策略型
            </li>
            <li className="border border-primary-100 rounded-full px-1">
              玩家對戰
            </li>
            <li className="border border-primary-100 rounded-full px-1">
              輕鬆休閒
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation("rooms");
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
          items={mockCarouselItems}
          uniqueKey="imgAlt"
          Component={CarouselCard}
        />
      </div>
      <div className="mt-[12px] mb-[22px]">
        <Carousel
          itemWidth={332}
          itemHeight={158}
          items={mockCarouselItems}
          itemsToSlide={2}
          autoplay
        />
      </div>
      <CreateRoomModal />
      <Button component={Link} href="/rooms">
        {t("rooms_list")}
      </Button>
      <FastJoinButton />
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
