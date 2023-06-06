import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Icon from "./index";
import { ArrowRightIcon } from "./group/arrow-right";

describe("Icon", () => {
  it("render Icon with correct definition", () => {
    const { container } = render(<Icon icon={ArrowRightIcon} />);

    const svg = container.querySelector("i");
    expect(svg).toBeInTheDocument();
  });
  it("Icon has correct className", () => {
    const className = "test class";
    const { container } = render(
      <Icon icon={ArrowRightIcon} className={className}></Icon>
    );

    const svg = container.querySelector("i");
    expect(svg).toHaveClass(className);
  });
  it("Icon has correct style", () => {
    const style = { color: "red" };
    const { container } = render(
      <Icon icon={ArrowRightIcon} style={style}></Icon>
    );

    const svg = container.querySelector("i");
    expect(svg).toHaveStyle(style);
  });
  it("Icon has correct name", () => {
    const iconName = ArrowRightIcon.name;
    const { container } = render(<Icon icon={ArrowRightIcon}></Icon>);

    const svg = container.querySelector("i");
    expect(svg?.getAttribute("data-icon-name")).toBe(iconName);
  });
});
