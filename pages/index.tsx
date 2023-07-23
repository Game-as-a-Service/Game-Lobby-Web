import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";

export default function Home() {
  const { t } = useTranslation("rooms");
  return (
    <>
      <h1 className="text-white">遊戲大廳！</h1>
      <div
        className="px-[18px] mt-[12px] mb-[22px]"
        style={{ width: "calc(100vw - 71px)" }}
      >
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
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", ["rooms"])),
    },
  };
};
