import React, { useState } from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Input, { ChangeHandler } from ".";

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
    const inputWrapperClassName = "test-input-wrapper";
    const hintTextClassName = "test-error";

    const { container } = render(
      <Input
        value="test"
        label="label"
        maxLength={1}
        error
        hintText="hint text"
        className={rootClassName}
        labelClassName={labelClassName}
        inputClassName={inputClassName}
        inputWrapperClassName={inputWrapperClassName}
        hintTextClassName={hintTextClassName}
      />
    );

    const rootElement = container.querySelector("div");
    const inputElement = container.querySelector("input");
    const labelElement = container.querySelector("label");
    const hintTextElement = screen.getByText("hint text");

    expect(rootElement).toHaveClass(rootClassName);
    expect(labelElement).toHaveClass(labelClassName);
    expect(inputElement).toHaveClass(inputClassName);
    expect(labelElement?.nextElementSibling).toHaveClass(inputWrapperClassName);
    expect(hintTextElement).toHaveClass(hintTextClassName);
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

  it("should not call onChange when input is typed in disabled mode", async () => {
    const initValue = "test";
    const mockChange = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(initValue);
      const handleChange: ChangeHandler = (v, e) => {
        setValue(v);
        mockChange(v, e);
      };

      return <Input value={value} onChange={handleChange} disabled />;
    };

    render(<ControllerComponent />);

    const inputElement = screen.getByRole<HTMLInputElement>("textbox");

    expect(inputElement).toBeDisabled();
    expect(inputElement.value).toBe(initValue);

    const typingValue = "value";

    await act(async () => {
      await userEvent.type(inputElement, typingValue);
    });

    expect(mockChange).not.toHaveBeenCalled();
    expect(inputElement.value).toBe(initValue);
  });
});
