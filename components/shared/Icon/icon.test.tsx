import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./index";
import { ArrowRightIcon } from "./group/arrow-right";

describe("Icon", () => {
  it("render Icon with correct definition", () => {
    const { container } = render(<Icon icon={ArrowRightIcon} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("Icon has correct className", () => {
    const className = "test class";
    const { container } = render(
      <Icon icon={ArrowRightIcon} className={className} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass(className);
  });

  it("Icon has spin animation", () => {
    const { container } = render(<Icon icon={ArrowRightIcon} spin />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("animate-spin");
  });
});
