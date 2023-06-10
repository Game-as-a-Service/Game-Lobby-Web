import React from "react";
import { fireEvent, render,  } from "@testing-library/react";
import "@testing-library/jest-dom";

import CarouselItem from "./CarouselItem";
import { mockCarouselItems } from ".";

// bypass the optimization on images
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} {...rest} />;
  },
}));

describe("Carouselitem", () => {
  const item = mockCarouselItems[0];

  it('navigate to the correct route when the carousel item is clicked', () => {
    const href = mockCarouselItems[0].link;
    const { getByRole } = render(
      <CarouselItem
        itemWidth={300}
        itemHeight={200}
        imgUrl={item.imgUrl} 
        imgAlt={item.imgAlt}
        link={item.link}
        />
    );
    const carouselItem = getByRole("link");
    expect(carouselItem).toHaveAttribute("href", href);
  });

  it('show the image error fallback and alt when the image url is invalid', () => {
    const onError = jest.fn();

    const { getByRole, getByText } = render(
      <CarouselItem
        itemWidth={300}
        itemHeight={200}
        imgUrl={item.imgUrl} 
        imgAlt={item.imgAlt}
        link={item.link}
        />
    );
    const image = getByRole("img");
    expect(image).toHaveAttribute("src", item.imgUrl);
    expect(onError).not.toHaveBeenCalled();

    image.onerror = onError;
    fireEvent.error(image);
    expect(onError).toHaveBeenCalled();

    // The image should be replaced with the fallback image
    expect(image).not.toBeInTheDocument();
    const imageFallback = getByText(item.imgAlt);
    expect(imageFallback).toBeInTheDocument();
  })
});
