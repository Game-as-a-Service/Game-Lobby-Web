import Link from "next/link";
import Image from "next/image";
import { forwardRef, useState, ForwardRefRenderFunction } from "react";
import { cn } from "@/lib/utils";
import { CarouselItem as CarouselItemType } from "./Carousel";

interface CarouselItemProps extends CarouselItemType {
  itemWidth: number;
  itemHeight: number;
  isMasked?: boolean;
}

const InternalCarouselItem: ForwardRefRenderFunction<
  HTMLDivElement,
  CarouselItemProps
> = (
  { itemWidth, itemHeight, imgUrl, imgAlt, link, isMasked = false },
  ref
) => {
  const [isImgError, setIsImgError] = useState(!imgUrl);

  const carouselItemClass =
    "relative rounded-[10px] shrink-0 overflow-hidden group";

  const scaleOnHoverClass =
    "group-hover:scale-125 transition duration-300 ease-in-out";

  const imgFallbackClass = cn(
    "flex items-center justify-center bg-[#5865F2] text-white text-lg",
    scaleOnHoverClass
  );

  const overlayClass = "absolute left-0 top-0 w-full h-full trasition-opacity";

  return (
    <Link href={link}>
      <div
        className={carouselItemClass}
        style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
        ref={ref}
      >
        {isImgError ? (
          <div
            className={imgFallbackClass}
            style={{ width: `${itemWidth}px`, height: `${itemHeight}px` }}
          >
            {imgAlt}
          </div>
        ) : (
          <>
            <div
              className={overlayClass}
              style={{
                opacity: isMasked ? 1 : 0,
                background:
                  "linear-gradient(270deg, #212123 32.29%, rgba(33, 33, 35, 0) 100%)",
              }}
            />
            <Image
              className={cn("w-full h-full object-cover", scaleOnHoverClass)}
              src={imgUrl}
              alt={imgAlt ? imgAlt : ""}
              width={itemWidth}
              height={itemHeight}
              onError={() => setIsImgError(true)}
              draggable={false}
              priority
            />
          </>
        )}
      </div>
    </Link>
  );
};
const CarouselItem = forwardRef(InternalCarouselItem);
export default CarouselItem;
