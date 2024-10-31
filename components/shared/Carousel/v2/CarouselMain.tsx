import { CSSProperties, useCallback, useRef, useState } from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import useAutoReset from "@/hooks/useAutoReset";
import { cn } from "@/lib/utils";
import { useCarousel } from "./CarouselContext";
import { CarouselMainProps } from "./Carousel.type";

export default function CarouselMain({ className }: CarouselMainProps) {
  const { showIndex, items, Component, renderKey } = useCarousel();
  const [carouselItemWidth, setCarouselItemWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useAutoReset(true, 150);

  const handleResize = useCallback(
    (rect: ResizeObserverEntry) => {
      setIsAnimating(false);
      setCarouselItemWidth(rect.contentRect.width);
    },
    [setIsAnimating]
  );

  useResizeObserver({
    elementRef: carouselRef,
    callback: handleResize,
  });

  return (
    <div ref={carouselRef} className={cn("w-full overflow-hidden", className)}>
      <ul
        className={cn(
          "flex translate-x-[var(--translate-x)]",
          isAnimating && "transition-transform"
        )}
        style={
          {
            "--translate-x": `${showIndex * carouselItemWidth * -1}px`,
          } as CSSProperties
        }
      >
        {Array.isArray(items) &&
          items.map((item, index) => (
            <li
              key={renderKey(item)}
              className="shrink-0 w-[var(--carousel-item-width)]"
              style={
                {
                  "--carousel-item-width": `${carouselItemWidth}px`,
                } as CSSProperties
              }
            >
              <Component showIndex={showIndex} index={index} {...item} />
            </li>
          ))}
      </ul>
    </div>
  );
}
