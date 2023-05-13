import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Button,
  buttonVariants,
  roundedVariants,
  sizeVariants,
} from "./Button";

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
      <Button variant="danger" rounded="pill" size="large" className="test">
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass(buttonVariants.danger);
    expect(button).toHaveClass(roundedVariants.pill);
    expect(button).toHaveClass(sizeVariants.large);
    expect(button).toHaveClass("test");
    expect(button).not.toHaveClass(buttonVariants.primary);
    expect(button).not.toHaveClass(buttonVariants.secondary);
    expect(button).not.toHaveClass(roundedVariants.bottom);
    expect(button).not.toHaveClass(roundedVariants.default);
    expect(button).not.toHaveClass(roundedVariants.none);
    expect(button).not.toHaveClass(sizeVariants.medium);
    expect(button).not.toHaveClass(sizeVariants.small);
    expect(button).not.toHaveClass("pointer-events-none");
    expect(button).not.toHaveClass("is-active");
  });

  it("should render correct element based on the provided component prop", async () => {
    const handleClick = jest.fn();
    const MockComponent = (props: {}) => <a {...props} onClick={handleClick} />;

    render(<Button component={MockComponent}>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    await userEvent.click(button);

    expect(button.nodeName).toBe("A");
    expect(handleClick).toBeCalledTimes(1);

    await userEvent.click(button);

    expect(handleClick).toBeCalledTimes(2);
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
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Button</Button>);

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(handleClick).not.toBeCalled();

    await userEvent.click(button);

    expect(handleClick).toBeCalledTimes(1);

    await userEvent.click(button);

    expect(handleClick).toBeCalledTimes(2);
  });

  it("should not be clickable when disabled", async () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Button
      </Button>
    );

    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("pointer-events-none");
    expect(handleClick).not.toBeCalled();

    await userEvent.click(button);

    expect(handleClick).not.toBeCalled();

    await userEvent.click(button);

    expect(handleClick).not.toBeCalled();
  });

  it("should render loading component when loading", () => {
    const MockComponent = () => <span data-test-id="loading" />;
    render(
      <Button loadingComponent={<MockComponent />} loading>
        Button
      </Button>
    );
    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("pointer-events-none");
    expect(
      button.querySelector("[data-test-id='loading']")
    ).toBeInTheDocument();
  });

  it("should show is-active className when active", () => {
    render(<Button active>Button</Button>);
    const button = screen.getByRole("button", {
      name: /Button/i,
    });

    expect(button).toHaveClass("is-active");
  });
});
