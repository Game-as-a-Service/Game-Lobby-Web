import { cn } from "@/lib/utils";
import { useCarousel, useCarouselDispatch } from "./CarouselContext";
import { CarouselActionType, CarouselPaginationProps } from "./Carousel.type";

export default function CarouselPagination({
  className,
}: CarouselPaginationProps) {
  const { showIndex, items, renderKey } = useCarousel();
  const dispatch = useCarouselDispatch();

  return (
    <nav className={className}>
      <ul className="flex justify-center">
        {Array.isArray(items) &&
          items.map((item, index) => (
            <li key={renderKey(item)}>
              <button
                type="button"
                className="block p-2"
                onClick={() =>
                  dispatch({
                    type: CarouselActionType.SetPage,
                    payload: { page: index },
                  })
                }
              >
                <div
                  className={cn(
                    "w-10 h-px bg-primary-700 transition-colors",
                    index === showIndex && "bg-primary-200"
                  )}
                ></div>
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
