import React from "react";
import { render } from "@testing-library/react";
import Icon from "./Icon";
import type { IconName } from "./icons";

describe("IconV2", () => {
  const TEST_ICON_NAME: IconName = "Arcade";
  it("should render Icon with correct name", () => {
    const { container } = render(<Icon name={TEST_ICON_NAME} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render Icon with correct class name", () => {
    const { container } = render(
      <Icon name={TEST_ICON_NAME} className="stroke-red-500 fill-black" />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("stroke-red-500");
    expect(svg).toHaveClass("fill-black");
  });
});
