import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";
import GamesListView from "@/components/lobby/games/GamesListView";

export default function Home() {
  const { t } = useTranslation("rooms");
  return (
    <div className="grid">
      <Carousel
        itemWidth={332}
        itemHeight={158}
        items={mockCarouselItems}
        itemsToSlide={2}
        autoplay
      />
      <GamesListView />
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
