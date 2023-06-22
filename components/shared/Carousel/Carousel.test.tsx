import React from "react";
import {
  render,
  fireEvent,
  getByRole,
  getAllByRole,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Carousel, { mockCarouselItems } from ".";

// bypass the optimization on images
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img src={src} {...rest} />;
  },
}));

jest.mock("path/to/image.svg", () => "svg");

describe("Carousel", () => {
  const items = mockCarouselItems;

  it("renders carousel with correct items", () => {
    const { getByAltText } = render(
      <Carousel items={items} itemWidth={300} itemHeight={200} />
    );

    items.forEach((item) => {
      const imageElement = getByAltText(item.imgAlt);
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute("src", item.imgUrl);
    });
  });

  it("navigate to the correct route when the carousel item is clicked", () => {
    const href = mockCarouselItems[0].link;
    const { getAllByRole } = render(
      <Carousel items={items} itemWidth={300} itemHeight={200} />
    );
    const carouselItem = getAllByRole("link")[0];
    expect(carouselItem).toHaveAttribute("href", href);
  });
});
