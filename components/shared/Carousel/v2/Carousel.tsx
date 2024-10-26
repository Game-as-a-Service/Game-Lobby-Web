import CarouselButton from "./CarouselButton";
import CarouselPagination from "./CarouselPagination";
import CarouselMain from "./CarouselMain";
import { CarouselProvider } from "./CarouselContext";
import { CarouselProps, TItem } from "./Carousel.type";

export default function Carousel<Item extends TItem>({
  items,
  renderKey,
  Component,
}: Readonly<CarouselProps<Item>>) {
  return (
    <CarouselProvider items={items} renderKey={renderKey} Component={Component}>
      <div className="flex items-center">
        <CarouselButton type="previous" />
        <CarouselMain>
          <CarouselPagination />
        </CarouselMain>
        <CarouselButton type="next" />
      </div>
    </CarouselProvider>
  );
}
