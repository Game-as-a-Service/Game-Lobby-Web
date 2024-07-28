import { FC, useState } from "react";
import Icon from "../../Icon/v2/Icon";
import { cn } from "@/lib/utils";

interface CarouselProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
> {
  items: (T & Record<K, string>)[];
  uniqueKey: K;
  Component: FC<T>;
}

export default function Carousel<T extends Record<string, unknown>>({
  items,
  uniqueKey,
  Component,
}: Readonly<CarouselProps<T>>) {
  const [showIndex, setShowIndex] = useState(0);

  const handleChangePage = (action: "prev" | "next") => () => {
    const maxIndex = items.length - 1;

    switch (action) {
      case "prev":
        setShowIndex((preIndex) => {
          const newIndex = preIndex - 1;
          return newIndex > -1 ? newIndex : maxIndex;
        });
        break;
      case "next":
        setShowIndex((preIndex) => {
          const newIndex = preIndex + 1;
          return newIndex <= maxIndex ? newIndex : 0;
        });
        break;
      default:
    }
  };

  const buttonClassName =
    "p-2.5 shrink-0 bg-white/4 shadow-default rounded-2xl";
  const buttonIconClassName = "stroke-white w-6 h-6 pointer-events-none";

  return (
    <div className="flex items-center">
      <button
        type="button"
        className={buttonClassName}
        onClick={handleChangePage("prev")}
      >
        <Icon name="navArrowLeft" className={buttonIconClassName} />
      </button>
      <ul>
        {Array.isArray(items) &&
          items.map((item, index) => (
            <li
              key={item[uniqueKey]}
              className={cn(showIndex !== index && "hidden")}
            >
              <Component {...item} />
            </li>
          ))}
      </ul>
      <button
        type="button"
        className={buttonClassName}
        onClick={handleChangePage("next")}
      >
        <Icon name="navArrowRight" className={buttonIconClassName} />
      </button>
    </div>
  );
}
