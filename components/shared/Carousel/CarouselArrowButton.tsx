import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import PrevArrow from '@/public/images/arrow-prev.svg'
import NextArrow from '@/public/images/arrow-next.svg'

export type CarouselArrowButtonType = "prev" | "next";

export interface CarouselArrowButtonProps {
  type: CarouselArrowButtonType;
  isDisabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function CarouselArrowButton({
  type,
  isDisabled = false,
  onClick,
}: CarouselArrowButtonProps) {
  const baseClass = `
    w-[24px] h-full z-10 bg-[#292A2D] rounded-[10px]
    flex justify-center items-center text-white font-bold 
  `;

  const prevClass = "absolute left-0 top-0";

  const nextClass = "absolute right-0 top-0";

  const disabledClass = "opacity-30";

  const btnClass = cn(
    baseClass,
    isDisabled ? disabledClass : "",
    type === "prev" ? prevClass : nextClass
  );

  const arrowIcon = {
    prev:<PrevArrow />,
    next: <NextArrow />
  };


  return (
    <button
      name={type}
      className={btnClass}
      disabled={isDisabled}
      onClick={onClick}
    >
     {arrowIcon[type]}
    </button>
  );
}
