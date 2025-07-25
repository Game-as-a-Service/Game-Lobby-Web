import { createContext, useContext, useEffect, useReducer } from "react";
import {
  CarouselActionType,
  CarouselProviderProps,
  ICarouselContext,
  TCarouselAction,
  TCarouselDispatchContext,
  TItem,
} from "./Carousel.type";

const CarouselContext = createContext<ICarouselContext | null>(null);
const CarouselDispatchContext = createContext<TCarouselDispatchContext | null>(
  null
);

const initialState: ICarouselContext = {
  items: [],
  showIndex: 0,
  renderKey: (item) => item.id,
  Component: (props) => props.id.toString(),
};

const calcPage = <Item extends TItem>(
  page: number,
  state: ICarouselContext<Item>
): number => {
  const maxPage = state.items.length - 1;
  if (page > maxPage) return 0;
  if (page < 0) return maxPage;
  return page;
};

const reducer = <Item extends TItem>(
  state: ICarouselContext<Item>,
  action: TCarouselAction<Item>
): ICarouselContext<Item> => {
  switch (action.type) {
    case CarouselActionType.Previous: {
      return {
        ...state,
        showIndex: calcPage(state.showIndex - 1, state),
      };
    }
    case CarouselActionType.Next: {
      return {
        ...state,
        showIndex: calcPage(state.showIndex + 1, state),
      };
    }
    case CarouselActionType.SetPage: {
      return {
        ...state,
        showIndex: calcPage(action.payload.page, state),
      };
    }
    case CarouselActionType.UpdateItems: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    default:
      throw new Error();
  }
};

export const useCarousel = () => {
  const hook = useContext(CarouselContext);
  if (!hook) {
    throw new Error("useCarousel must be used within a CarouselProvider.");
  }
  return hook;
};

export const useCarouselDispatch = () => {
  const hook = useContext(CarouselDispatchContext);
  if (!hook) {
    throw new Error(
      "useCarouselDispatch must be used within a CarouselProvider."
    );
  }
  return hook;
};

export function CarouselProvider<Item extends TItem>({
  children,
  items,
  Component,
  renderKey = (item) => item.id,
}: Readonly<CarouselProviderProps<Item>>) {
  const [state, dispatch] = useReducer(reducer<Item>, {
    ...initialState,
    items,
    Component,
    renderKey,
  });

  useEffect(() => {
    dispatch({
      type: CarouselActionType.UpdateItems,
      payload: { items },
    });
  }, [items]);

  return (
    <CarouselContext.Provider value={state as ICarouselContext}>
      <CarouselDispatchContext.Provider
        value={dispatch as TCarouselDispatchContext}
      >
        {children}
      </CarouselDispatchContext.Provider>
    </CarouselContext.Provider>
  );
}
