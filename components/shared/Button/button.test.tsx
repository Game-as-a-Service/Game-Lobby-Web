import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button", () => {
  it("should renders button text", () => {
    render(<Button>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toBeInTheDocument();
  });

  it("should have correct className", () => {
    render(
      <Button variant="danger" className="test">
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("test");
    expect(button).not.toHaveClass("pointer-events-none");
  });

  it("should render correct element based on the provided component prop", async () => {
    const mockClick = jest.fn();
    const MockComponent = (props: {}) => <a {...props} onClick={mockClick} />;

    render(<Button component={MockComponent}>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    await userEvent.click(button);

    expect(button.nodeName).toBe("A");
    expect(mockClick).toBeCalledTimes(1);

    await userEvent.click(button);

    expect(mockClick).toBeCalledTimes(2);
  });

  it("should render a button with prefix and suffix", () => {
    const PrefixIcon = () => <span data-test-id="prefix" />;
    const SuffixIcon = () => <span data-test-id="suffix" />;

    render(
      <Button prefix={<PrefixIcon />} suffix={<SuffixIcon />}>
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button.querySelector("[data-test-id='prefix']")).toBeInTheDocument();
    expect(button.querySelector("[data-test-id='suffix']")).toBeInTheDocument();
  });

  it("should trigger onClick when clicked", async () => {
    const mockClick = jest.fn();
    render(<Button onClick={mockClick}>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(mockClick).not.toBeCalled();

    await userEvent.click(button);

    expect(mockClick).toBeCalledTimes(1);

    await userEvent.click(button);

    expect(mockClick).toBeCalledTimes(2);
  });

  it("should not be clickable when disabled", async () => {
    const mockClick = jest.fn();

    render(
      <Button onClick={mockClick} disabled>
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("pointer-events-none");
    expect(mockClick).not.toBeCalled();

    await userEvent.click(button);

    expect(mockClick).not.toBeCalled();

    await userEvent.click(button);

    expect(mockClick).not.toBeCalled();
  });

  it("should render loading component when loading", () => {
    const MockComponent = () => <span id="loading" />;
    render(
      <Button loadingComponent={<MockComponent />} loading>
        Button
      </Button>
    );
    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("pointer-events-none");
    expect(button.querySelector("#loading")).toBeInTheDocument();
  });
});
