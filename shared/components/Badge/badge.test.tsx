import React from "react";
import { render } from "@testing-library/react";
import { Badge, positionVariants } from "./Badge";

describe("Badge", () => {
  /**
   * 測試是否正常render
   */
  it("renders without error", () => {
    render(<Badge />);
  });

  it("renders children", () => {
    const { getByText } = render(<Badge>Badge content</Badge>);
    const element = getByText("Badge content");
    expect(element).toBeInTheDocument();
  });

  it("renders count", () => {
    const { getByText } = render(<Badge count={5} />);
    const element = getByText("5");
    expect(element).toBeInTheDocument();
  });

  it("renders dot", () => {
    const { container } = render(<Badge dot={true} count={5} />);
    const element = container.querySelector(".badge__dot");
    expect(element).toBeInTheDocument();
  });

  it("does not render count when count exceeds overflowCount", () => {
    const { queryByText } = render(<Badge count={100} overflowCount={99} />);
    const element = queryByText("100");
    expect(element).toBeNull();
  });

  it("should render ${overflowCount}+ when count exceeds overflowCount", () => {
    const MockIcon = () => <span data-test-id="IconInBadge" />;
    const { container } = render(<Badge count={<MockIcon />} />);
    const element = container.querySelector("[data-test-id='IconInBadge']");
    expect(element).toBeInTheDocument();
  });

  it("should render a custom icon when icon is provided", () => {
    const { queryByText } = render(<Badge count={100} overflowCount={99} />);
    const element = queryByText("99+");
    expect(element).toBeInTheDocument();
  });

  /**
   * 測試 showZero 與 count 情況
   */
  it("should show zero when showZero is true and count is 0", () => {
    const { container } = render(<Badge count={0} showZero={true} />);
    const element = container.querySelector(".badge__count");
    expect(element).toHaveTextContent("0");
  });

  it("should shows badge when showZero is true and count is non-zero", () => {
    const { getByText } = render(<Badge count={5} showZero={true} />);
    const element = getByText("5");
    expect(element).toBeInTheDocument();
  });

  it("should show badge when showZero is false and count is non-zero  ", () => {
    const { getByText } = render(<Badge count={5} showZero={false} />);
    const element = getByText("5");
    expect(element).toBeInTheDocument();
  });

  it("should not show badge when showZero is false and count is zero", () => {
    const { container } = render(<Badge count={0} showZero={false} />);
    const element = container.querySelector(".hidden");
    expect(element).toBeInTheDocument();
  });

  /**
   * 測試 placeholder
   */
  it("should render dot badge at top right by default", () => {
    const { container } = render(<Badge dot />);
    const element = container.querySelector(".badge__content");
    expect(element).toHaveClass(positionVariants["top-right"]);
  });

  it("should render count badge at top left", () => {
    const { container } = render(<Badge count={5} placement="top-left" />);
    const element = container.querySelector(".badge__content");
    expect(element).toHaveClass(positionVariants["top-left"]);
  });

  it("should render count badge at bottom right", () => {
    const { container } = render(<Badge count={5} placement="bottom-right" />);
    const element = container.querySelector(".badge__content");
    expect(element).toHaveClass(positionVariants["bottom-right"]);
  });

  it("should render count badge at bottom left", () => {
    const { container } = render(<Badge count={5} placement="bottom-left" />);
    const element = container.querySelector(".badge__content");
    expect(element).toHaveClass(positionVariants["bottom-left"]);
  });
  /**
   * 測試 badge color
   */
  it("should render #f85149 badge by default", () => {
    const color = "#f85149";
    const { container } = render(<Badge count={5} />);
    const element = container.querySelector(".badge__count");
    expect(element).toHaveStyle(`background-color: ${color}`);
  });

  it("should render dot badge with the correct color", () => {
    const color = "#f00";
    const { container } = render(<Badge color={color} dot count={5} />);
    const element = container.querySelector(".badge__dot");
    expect(element).toHaveStyle(`background-color: ${color}`);
  });

  it("should render normal badge with the correct color", () => {
    const color = "#f00";
    const { container } = render(<Badge color={color} count={5} />);
    const element = container.querySelector(".badge__count");
    expect(element).toHaveStyle(`background-color: ${color}`);
  });
});
