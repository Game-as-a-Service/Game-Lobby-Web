import { useEffect, useRef, useState } from "react";

import CarouselArrowButton, {
  CarouselArrowButtonType,
} from "./CarouselArrowButton";
import CarouselItem from "./CarouselItem";

const ITEM_GAP = 13;
const BUTTON_WIDTH = 24;
const AUTO_PLAY_INTERVAL_SECOND = 5;

export type CarouselItem = {
  /** the carousel item image address */
  imgUrl: string;
  /** the 'alt' attribute of the carousel item image */
  imgAlt: string;
  /** navigation link of the carousel item */
  link: string;
};

interface CarouselProps {
  /** The width of each carousel item (px) */
  itemWidth: number;
  /** The height of the carousel item (px) */
  itemHeight: number;
  /** Rendering data for the carousel items */
  items: CarouselItem[];
  /** The amount of carousel items to move per sliding */
  itemsToSlide?: number;
  /** If true, the carousel will auto play */
  autoplay?: boolean;
  /** Autoplay interval second */
  autoplayInterval?: number;
}

export default function Carousel({
  itemWidth,
  itemHeight,
  items = [],
  itemsToSlide = 1,
  autoplay = false,
  autoplayInterval = AUTO_PLAY_INTERVAL_SECOND,
}: CarouselProps) {
  if (itemWidth <= 0 || itemHeight <= 0) {
    throw new Error("Carousel item width/height must be greater than 0.");
  }

  if (itemsToSlide <= 0) {
    throw new Error("Items to slide must be greater than 0.");
  }

  if (items.length <= 0) {
    throw new Error("Carousel items cannot be empty.");
  }

  const [dynamicItemWidth, setDynamicItemWidth] = useState(itemWidth);
  const [translateValue, setTranslateValue] = useState(0);
  const [maxTranslateValue, setMaxTranslateValue] = useState(0);
  const [translateValuePerSlide, setTranslateValuePerSlide] = useState(0);
  const [doPauseAutoPlay, setDoPauseAutoPlay] = useState(false);
  const [maskedItemIndex, setMaskedItemIndex] = useState<number | null>(null);

  const carouselItemsContainerRef = useRef<HTMLDivElement>(null);
  const carouselItemsRef = useRef<HTMLDivElement>(null);
  const carouselItemRef = useRef<HTMLDivElement>(null);

  const autoPlayIntervalId = useRef<NodeJS.Timer>();

  const applyMaxTranslateValue = () => {
    if (carouselItemsContainerRef.current && carouselItemsRef.current) {
      const _maxTranslateValue =
        carouselItemsRef.current.scrollWidth -
        carouselItemsContainerRef.current.clientWidth +
        BUTTON_WIDTH * 2;
      setMaxTranslateValue(_maxTranslateValue);
    }
  };

  const applyTranslateValuePerSlide = () => {
    if (carouselItemRef.current) {
      const itemWidth = carouselItemRef.current.clientWidth;
      const _translateValuePerSlide = itemWidth + ITEM_GAP;
      setTranslateValuePerSlide(_translateValuePerSlide);
    }
  };

  const applyDynamicItemWidth = () => {
    if (carouselItemsContainerRef.current && carouselItemsRef.current) {
      const containerWidth = carouselItemsContainerRef.current.clientWidth;
      const itemsWidth = carouselItemsRef.current.scrollWidth;

      const gapCount = items.length - 1;

      if (itemsWidth < containerWidth) {
        const _dynamicItemWidth = Math.floor(
          (containerWidth - gapCount * ITEM_GAP) / items.length
        );

        setDynamicItemWidth(
          _dynamicItemWidth < itemWidth ? itemWidth : _dynamicItemWidth
        );
      } else if (containerWidth < itemWidth) {
        setDynamicItemWidth(containerWidth - BUTTON_WIDTH * 2);
      }
    }
  };

  const resetTranslateValue = () => setTranslateValue(0);

  const handleMouseEnter = () => {
    // Stop autoplay when the user hovers over the Carousel
    setDoPauseAutoPlay(true);
  };

  const handleMouseLeave = () => {
    // Resume autoplay when the user stops hovering over the Carousel
    setDoPauseAutoPlay(false);
  };

  const updateMaskedItemIndex = () => {
    if (carouselItemsContainerRef.current && carouselItemRef.current) {
      const activeAreaWidth =
        carouselItemsContainerRef.current.clientWidth - BUTTON_WIDTH * 2;
      const revealedItemsWidth = activeAreaWidth + translateValue;
      const itemUnitWidth = carouselItemRef.current.clientWidth + ITEM_GAP;
      const _maskedItemIndex =
        Math.ceil(revealedItemsWidth / itemUnitWidth) - 1;
      setMaskedItemIndex(_maskedItemIndex);
    }
  };

  // Initialize dynamicItemWidth & maxTranslateValue
  useEffect(() => {
    applyDynamicItemWidth();
    applyMaxTranslateValue();
  }, []);

  // Initialize translateValuePerSlide
  useEffect(() => {
    applyTranslateValuePerSlide();
  }, [dynamicItemWidth]);

  // Update masked item index
  useEffect(() => {
    updateMaskedItemIndex();
  }, [translateValue]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      applyDynamicItemWidth();
      resetTranslateValue();
      applyMaxTranslateValue();
      updateMaskedItemIndex();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!autoplay) {
      if (autoPlayIntervalId.current) {
        clearInterval(autoPlayIntervalId.current);
      }
      return;
    }

    if (doPauseAutoPlay) {
      clearInterval(autoPlayIntervalId.current);
    } else {
      const intervalId = setInterval(() => {
        setDoPauseAutoPlay(false);

        if (translateValue < maxTranslateValue) {
          slide("next");
        } else {
          resetTranslateValue();
        }
      }, autoplayInterval * 1000);

      // store the intervalId with ref instead of state to prevent re-render
      autoPlayIntervalId.current = intervalId;
    }

    return () => clearInterval(autoPlayIntervalId.current);
  }, [autoplay, translateValue, doPauseAutoPlay, maxTranslateValue]);

  const slide = (type: CarouselArrowButtonType) => {
    switch (type) {
      case "prev": {
        return setTranslateValue((prev) => {
          const newTranslateValue =
            prev - translateValuePerSlide * itemsToSlide;
          return newTranslateValue < translateValuePerSlide
            ? 0
            : newTranslateValue;
        });
      }
      case "next": {
        return setTranslateValue((prev) => {
          const newTranslateValue =
            prev + translateValuePerSlide * itemsToSlide;
          return maxTranslateValue - newTranslateValue < translateValuePerSlide
            ? maxTranslateValue
            : newTranslateValue;
        });
      }
      default:
        throw new Error(`Invalid slide type: ${type}`);
    }
  };

  const isPrevBtnDisabled = translateValue <= 0;
  const isNextBtnDisabled = translateValue >= maxTranslateValue;

  const carouselContainerClassName = `
    w-full h-fit flex items-stretch relative rounded-[10px] overflow-hidden
  `;

  const carouselItemsContainerClass = `
    flex-1 overflow-hidden px-[24px]
  `;

  const carouselItemsClass = `
    w-fit px-[7px] flex  shrink-0 gap-[13px] transition-transform duration-300 ease-in-out 
  `;

  return (
    <div
      className={carouselContainerClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CarouselArrowButton
        type="prev"
        isDisabled={isPrevBtnDisabled}
        onClick={() => slide("prev")}
      />
      <div
        className={carouselItemsContainerClass}
        ref={carouselItemsContainerRef}
      >
        <div
          className={carouselItemsClass}
          ref={carouselItemsRef}
          style={{
            transform: `translateX(${-translateValue}px)`,
          }}
        >
          {items.map((item, i) => (
            <CarouselItem
              key={i}
              ref={carouselItemRef}
              itemWidth={dynamicItemWidth}
              itemHeight={itemHeight}
              imgUrl={item.imgUrl}
              imgAlt={item.imgAlt}
              link={item.link}
              isMasked={i === maskedItemIndex}
            />
          ))}
        </div>
      </div>
      <CarouselArrowButton
        type="next"
        isDisabled={isNextBtnDisabled}
        onClick={() => slide("next")}
      />
    </div>
  );
}
