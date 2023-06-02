import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Input, { ChangeHandler } from "./Input";

describe("Input", () => {
  it("should renders input component with correct value", async () => {
    const initValue = "test";
    const mockChange = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(initValue);
      const handleChange: ChangeHandler = (v, e) => {
        setValue(v);
        mockChange(v, e);
      };

      return <Input value={value} onChange={handleChange} />;
    };

    render(<ControllerComponent />);

    const inputElement = screen.getByRole<HTMLInputElement>("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(initValue);

    const typingValue = "value";

    await act(async () => {
      await userEvent.type(inputElement, typingValue);
    });

    expect(mockChange).toHaveBeenCalledTimes(typingValue.length);
    expect(mockChange).toHaveBeenCalledWith(
      initValue + typingValue,
      expect.any(Object)
    );
    expect(inputElement.value).toBe(initValue + typingValue);
  });

  it("should renders correct class name", async () => {
    const rootClassName = "test-root";
    const labelClassName = "test-label";
    const inputClassName = "test-input";
    const errorClassName = "test-error";
    const maxLengthClassName = "test-error";

    const { container } = render(
      <Input
        value="test"
        label="label"
        maxLength={1}
        error
        errorMessage="error message"
        className={rootClassName}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        maxLengthClassName={maxLengthClassName}
      />
    );

    const rootElement = container.querySelector("div");
    const inputElement = container.querySelector("input");
    const labelElement = container.querySelector("label");
    const errorElement = screen.getByText("error message");
    const maxLengthElement = container.querySelector("div.absolute");

    expect(rootElement).toHaveClass(rootClassName);
    expect(labelElement).toHaveClass(labelClassName);
    expect(inputElement).toHaveClass(inputClassName);
    expect(errorElement).toHaveClass(errorClassName);
    expect(maxLengthElement).toHaveClass(maxLengthClassName);
  });

  it("should render prefix and suffix", async () => {
    const Prefix = () => <span>prefix</span>;
    const Suffix = () => <span>suffix</span>;

    render(<Input value="test" prefix={<Prefix />} suffix={<Suffix />} />);

    const prefix = await screen.findByText("prefix");
    const suffix = await screen.findByText("suffix");

    expect(prefix).toBeInTheDocument();
    expect(suffix).toBeInTheDocument();
  });

  it.each([["disabled"], ["readonly"]])(
    "should not call onChange when input is typed in %s mode",
    async (mode) => {
      const isDisabled = mode === "disabled";
      const isReadOnly = mode === "readonly";
      const initValue = "test";
      const mockChange = jest.fn();

      const ControllerComponent = () => {
        const [value, setValue] = useState(initValue);
        const handleChange: ChangeHandler = (v, e) => {
          setValue(v);
          mockChange(v, e);
        };

        return (
          <Input
            value={value}
            onChange={handleChange}
            disabled={isDisabled}
            readOnly={isReadOnly}
          />
        );
      };

      render(<ControllerComponent />);

      const inputElement = screen.getByRole<HTMLInputElement>("textbox");

      if (isDisabled) expect(inputElement).toBeDisabled();
      expect(inputElement.value).toBe(initValue);

      const typingValue = "value";

      await act(async () => {
        await userEvent.type(inputElement, typingValue);
      });

      expect(mockChange).not.toHaveBeenCalled();
      expect(inputElement.value).toBe(initValue);
    }
  );
});
