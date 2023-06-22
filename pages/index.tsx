import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";

export default function Home() {
  return (
    <>
      <h1 className="text-white">遊戲大廳！</h1>
      <div className="px-[18px] mt-[12px] mb-[22px]" style={{width: 'calc(100vw - 71px)'}}>
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
        查看房間列表
      </Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
