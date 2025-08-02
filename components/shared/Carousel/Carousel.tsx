import CarouselButton from "./CarouselButton";
import CarouselPagination from "./CarouselPagination";
import CarouselMain from "./CarouselMain";
import { CarouselProvider } from "./CarouselContext";
import { CarouselButtonType, CarouselProps, TItem } from "./Carousel.type";

export default function Carousel<Item extends TItem>({
  items,
  Component,
  renderKey,
}: Readonly<CarouselProps<Item>>) {
  return (
    <CarouselProvider items={items} renderKey={renderKey} Component={Component}>
      <div className="w-full">
        <div className="relative mb-4 w-full">
          <CarouselMain className="relative grid" />
          <CarouselButton
            type={CarouselButtonType.Previous}
            className="absolute top-1/2 left-0 -translate-y-1/2"
          />
          <CarouselButton
            type={CarouselButtonType.Next}
            className="absolute top-1/2 right-0 -translate-y-1/2"
          />
        </div>
        <CarouselPagination />
      </div>
    </CarouselProvider>
  );
}
