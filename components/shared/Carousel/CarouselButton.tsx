import Icon from "@/components/shared/Icon";
import { useCarouselDispatch } from "./CarouselContext";
import {
  CarouselActionType,
  CarouselButtonConfig,
  CarouselButtonProps,
  CarouselButtonType,
} from "./Carousel.type";
import { cn } from "@/lib/utils";

const configs: Record<CarouselButtonType, CarouselButtonConfig> = {
  [CarouselButtonType.Previous]: {
    iconName: "NavArrowLeft",
    actionType: CarouselActionType.Previous,
  },
  [CarouselButtonType.Next]: {
    iconName: "NavArrowRight",
    actionType: CarouselActionType.Next,
  },
};

export default function CarouselButton({
  type,
  className,
}: Readonly<CarouselButtonProps>) {
  const dispatch = useCarouselDispatch();
  const config = configs[type];
  return (
    <button
      type="button"
      className={cn("p-2.5 bg-white/4 shadow-default rounded-2xl", className)}
      onClick={() => dispatch({ type: config.actionType })}
    >
      <Icon
        name={config.iconName}
        className="stroke-white w-6 h-6 pointer-events-none"
      />
    </button>
  );
}
