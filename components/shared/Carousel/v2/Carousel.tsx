import { CSSProperties } from "react";
import CarouselButton from "./CarouselButton";
import CarouselPagination from "./CarouselPagination";
import CarouselMain from "./CarouselMain";
import { CarouselProvider } from "./CarouselContext";
import { CarouselButtonType, CarouselProps, TItem } from "./Carousel.type";

export default function Carousel<Item extends TItem>({
  items,
  maxWidth = window.innerWidth,
  Component,
  renderKey,
}: Readonly<CarouselProps<Item>>) {
  return (
    <CarouselProvider items={items} renderKey={renderKey} Component={Component}>
      <div
        className="max-w-[var(--window-width)]"
        style={{ "--window-width": `${maxWidth}px` } as CSSProperties}
      >
        <div className="relative mb-4 w-full">
          <CarouselMain className="sticky left-0 top-0" />
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
