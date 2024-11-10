import React from "react";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/",
    };
  },
}));

describe("Breadcrumb", () => {
  it("renders breadcrumb correctly", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item text="Home" href="/" />
        <Breadcrumb.Item text="About" href="/about" />
      </Breadcrumb>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders with custom separator correctly", () => {
    render(
      <Breadcrumb separator="///">
        <Breadcrumb.Item text="Home" href="/" />
        <Breadcrumb.Item text="About" href="/about" />
      </Breadcrumb>
    );

    const separator = screen.getAllByText("///");
    expect(separator).toHaveLength(1);
  });

  it("renders with ReactNode separator correctly", () => {
    render(
      <Breadcrumb separator={<span>***</span>}>
        <Breadcrumb.Item text="Home" href="/" />
        <Breadcrumb.Item text="About" href="/about" />
      </Breadcrumb>
    );

    const separator = screen.getByText("***");
    expect(separator).toBeInTheDocument();
  });

  it("renders breadcrumb items correctly", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item text="Home" href="/" />
        <Breadcrumb.Item text="About" href="/about" />
      </Breadcrumb>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("renders with custom className correctly", () => {
    render(
      <Breadcrumb className="test-class">
        <Breadcrumb.Item text="Home" href="/" />
        <Breadcrumb.Item text="About" href="/about" />
      </Breadcrumb>
    );

    expect(screen.getByRole("navigation")).toHaveClass("test-class");
  });
});
