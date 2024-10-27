import { Dispatch, FC, Key, PropsWithChildren } from "react";
import { IconName } from "@/components/shared/Icon";

export type TItem = Record<string, unknown> & { id: Key };

export type CarouselItemProps<Item extends TItem> = Item & {
  showIndex: number;
  index: number;
};

export interface ICarouselContext<Item extends TItem = TItem> {
  items: Item[];
  showIndex: number;
  renderKey: (item: Item) => Key;
  Component: FC<CarouselItemProps<Item>>;
}

export interface CarouselProps<Item extends TItem = TItem> {
  items: ICarouselContext<Item>["items"];
  Component: ICarouselContext<Item>["Component"];
  renderKey?: ICarouselContext<Item>["renderKey"];
}

export const enum CarouselActionType {
  Previous = "previous",
  Next = "next",
  SetPage = "setPage",
  UpdateItems = "updateItems",
}

export type TCarouselAction<Item extends TItem> =
  | { type: CarouselActionType.Previous }
  | { type: CarouselActionType.Next }
  | { type: CarouselActionType.SetPage; payload: { page: number } }
  | { type: CarouselActionType.UpdateItems; payload: { items: Item[] } };

export type TCarouselDispatchContext<Item extends TItem = TItem> = Dispatch<
  TCarouselAction<Item>
>;

export interface CarouselProviderProps<Item extends TItem>
  extends PropsWithChildren {
  items: ICarouselContext<Item>["items"];
  Component: ICarouselContext<Item>["Component"];
  renderKey?: ICarouselContext<Item>["renderKey"];
}

export interface CarouselButtonConfig {
  iconName: IconName;
  actionType: CarouselActionType.Previous | CarouselActionType.Next;
}
