import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./index";
import type { IconName } from "./icons";

jest.mock("path/to/image.svg", () => "svg");

describe("Icon", () => {
  const TEST_ICON_NAME: IconName = "arcade";
  it("render Icon with correct name", () => {
    const { container } = render(<Icon name={TEST_ICON_NAME} />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("Icon has correct className", () => {
    const className = "test class";
    const { container } = render(
      <Icon name={TEST_ICON_NAME} className={className} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveClass(className);
  });
});
