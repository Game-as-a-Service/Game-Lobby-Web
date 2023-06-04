import React from "react";
import { useRouter } from "next/router";
import { cleanup, render, screen } from "@testing-library/react";
import BreadcrumbItem from "./BreadcrumbItem";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
    };
  },
}));

describe("BreadcrumbItem", () => {
  it("renders children", () => {
    render(<BreadcrumbItem text="Home" href="/" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("applies base and active class when href matches current path", () => {
    render(<BreadcrumbItem text="Home" href="/" />);
    const item = screen.getByText("Home");
    expect(item).toHaveClass("text-base");
  });

  it("applies base, active, and hover class when href doesn't match current path", () => {
    render(<BreadcrumbItem text="Home" href="/different-path" />);
    const item = screen.getByText("Home");
    expect(item).toHaveClass("text-base hover:text-gray-500");
  });

  it("respects the className prop", () => {
    render(<BreadcrumbItem text="Home" className="test-class" href="/" />);
    const item = screen.getByText("Home");
    expect(item).toHaveClass("test-class");
  });
});
