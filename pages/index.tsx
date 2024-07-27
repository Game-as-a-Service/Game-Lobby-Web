import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";
import FastJoinButton from "@/components/lobby/FastJoinButton";
import SearchBar from "@/components/shared/SearchBar";

export default function Home() {
  const { t } = useTranslation("rooms");
  return (
    <div>
      <div className="flex justify-center">
        <SearchBar
          leftSlot={
            <button type="button" className="pl-5 pr-2.5 px-4 text-primary-300">
              類型
            </button>
          }
        />
      </div>
      <div className="px-[18px] mt-[12px] mb-[22px] w-[calc(100vw-100px)]">
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
