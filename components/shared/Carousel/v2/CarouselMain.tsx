import {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import useResizeObserver from "@/hooks/useResizeObserver";
import { useCarousel } from "./CarouselContext";
import useAutoReset from "@/hooks/useAutoReset";
import { cn } from "@/lib/utils";

export default function CarouselMain({ children }: PropsWithChildren) {
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
    <div ref={carouselRef} className="overflow-hidden w-full">
      <ul
        className={cn(
          "mb-4 flex translate-x-[var(--translate-x)]",
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
      {children}
    </div>
  );
}
