import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";

import Carousel, { mockCarouselItems } from "@/components/shared/Carousel";
import GamesListView from "@/components/lobby/games/GamesListView";

export default function Home() {
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
      <div>
        <Button component={Link} href="/rooms">
          查看房間列表
        </Button>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
