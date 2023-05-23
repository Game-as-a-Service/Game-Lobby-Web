import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tab from "./Tab";

describe("Tab", () => {
  it("should renders tab button with the correct label", () => {
    const label = "Test tab label";
    render(<Tab label={label} tabKey={"test"} />);

    expect(screen.getByRole("tab")).toHaveTextContent(label);
  });

  it("should renders tab button with the correct className", () => {
    const className = "test-class test-class2";
    render(<Tab label="test" tabKey={"test"} className={className} />);

    expect(screen.getByRole("tab")).toHaveClass(className);
  });

  it("should call the onClick handler when the tab is clicked", () => {
    const handleClickTab = jest.fn();
    render(<Tab label="test" tabKey={"test"} onTabClick={handleClickTab} />);

    fireEvent.click(screen.getByRole("tab"));

    expect(handleClickTab).toHaveBeenCalled();
  });

  it('should apply the active class when the "active" prop is true', () => {
    render(<Tab label="test" tabKey={"test"} active />);

    expect(screen.getByRole("tab")).toHaveClass("is-active");
  });

  it('should not apply the active class when the "active" prop is falsy', () => {
    render(<Tab label="test" tabKey={"test"} />);

    expect(screen.getByRole("tab")).not.toHaveClass("is-active");
  });
});
