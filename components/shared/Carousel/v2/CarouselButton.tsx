import Icon from "@/components/shared/Icon";
import { useCarouselDispatch } from "./CarouselContext";
import { CarouselActionType, CarouselButtonConfig } from "./Carousel.type";

export const enum CarouselButtonType {
  Previous = "previous",
  Next = "next",
}

interface CarouselButtonProps {
  type: CarouselButtonType | `${CarouselButtonType}`;
}

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
}: Readonly<CarouselButtonProps>) {
  const dispatch = useCarouselDispatch();
  const config = configs[type];
  return (
    <button
      type="button"
      className="p-2.5 shrink-0 bg-white/4 shadow-default rounded-2xl"
      onClick={() => dispatch({ type: config.actionType })}
    >
      <Icon
        name={config.iconName}
        className="stroke-white w-6 h-6 pointer-events-none"
      />
    </button>
  );
}
