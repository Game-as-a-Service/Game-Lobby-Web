import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";
import Icon from "@/components/shared/Icon";

export type CarouselArrowButtonType = "prev" | "next";

interface CarouselArrowButtonProps {
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
    w-[24px] h-full z-10 bg-[#292A2D] rounded-[8px]
    flex justify-center items-center text-white font-bold 
  `;

  const svgClass = "[&_*]:stroke-white";

  const prevClass = "absolute left-0 top-0";

  const nextClass = "absolute right-0 top-0";

  const disabledClass = "opacity-30";

  const btnClass = cn(
    baseClass,
    isDisabled ? disabledClass : "",
    type === "prev" ? prevClass : nextClass
  );

  const arrowIcon = {
    prev: <Icon name="NavArrowLeft" className={svgClass} />,
    next: <Icon name="NavArrowRight" className={svgClass} />,
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
