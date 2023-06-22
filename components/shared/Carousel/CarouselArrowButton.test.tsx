import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import CarouselArrowButton from "./CarouselArrowButton";

jest.mock("path/to/image.svg", () => "svg");

describe("CarouselArrowButton", () => {
  it("calls the onClick function when the button is clicked", () => {
    const onClick = jest.fn();

    const { getByRole } = render(
      <CarouselArrowButton type="next" onClick={onClick} />
    );
    const button = getByRole("button");
    button.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("does not call the onClick function if the button is disabled", () => {
    const onClick = jest.fn();

    const { getByRole } = render(
      <CarouselArrowButton type="next" onClick={onClick} isDisabled />
    );
    const button = getByRole("button");
    button.click();
    expect(onClick).not.toHaveBeenCalled();
  });
});
