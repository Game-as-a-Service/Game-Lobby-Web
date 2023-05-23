import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import type { ChangeHandler } from "../Input";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("should renders input component with correct value", async () => {
    const initValue = "test";
    const mockChange = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(initValue);
      const handleChange: ChangeHandler = (v, e) => {
        setValue(v);
        mockChange(v, e);
      };

      return <SearchBar value={value} onChange={handleChange} />;
    };

    render(<ControllerComponent />);

    const inputElement = screen.getByRole<HTMLInputElement>("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(initValue);

    const typingValue = "search";

    await userEvent.type(inputElement, typingValue);

    expect(mockChange).toHaveBeenCalledTimes(typingValue.length);
    expect(mockChange).toHaveBeenLastCalledWith(
      initValue + typingValue,
      expect.any(Object)
    );
    expect(inputElement.value).toBe(initValue + typingValue);
  });

  it("should call the onSubmit event handler with the correct value and event object", async () => {
    const initValue = "test-submit";
    const mockSubmit = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(initValue);

      return (
        <SearchBar
          value={value}
          onChange={setValue}
          onSubmit={mockSubmit}
          buttonText="查詢"
        />
      );
    };

    render(<ControllerComponent />);

    const inputElement = screen.getByRole<HTMLInputElement>("textbox");
    const buttonElement = screen.getByRole("button", {
      name: "查詢",
    });

    expect(buttonElement).toBeInTheDocument();

    await userEvent.click(buttonElement);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenLastCalledWith(initValue, expect.any(Object));

    const typingValue = "-complete";

    await userEvent.type(inputElement, typingValue);
    await userEvent.click(buttonElement);

    expect(mockSubmit).toHaveBeenCalledTimes(2);
    expect(mockSubmit).toHaveBeenLastCalledWith(
      initValue + typingValue,
      expect.any(Object)
    );
  });

  it("should call the onEnter event handler with the correct value", async () => {
    const initValue = "test-enter";
    const mockEnter = jest.fn();

    const ControllerComponent = () => {
      const [value, setValue] = useState(initValue);

      return (
        <SearchBar value={value} onChange={setValue} onEnter={mockEnter} />
      );
    };

    render(<ControllerComponent />);

    const inputElement = screen.getByRole<HTMLInputElement>("textbox");

    expect(inputElement).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(inputElement, "{Enter}");
    });

    expect(mockEnter).toHaveBeenCalledTimes(1);
    expect(mockEnter).toHaveBeenLastCalledWith(initValue);

    fireEvent.compositionStart(inputElement);
    await act(async () => {
      await userEvent.type(inputElement, "{Enter}");
    });

    expect(mockEnter).toHaveBeenCalledTimes(1);

    const typingValue = "-complete";

    fireEvent.compositionEnd(inputElement);
    await act(async () => {
      await userEvent.type(inputElement, typingValue);
      await userEvent.type(inputElement, "{Enter}");
    });

    expect(mockEnter).toHaveBeenCalledTimes(2);
    expect(mockEnter).toHaveBeenLastCalledWith(initValue + typingValue);
  });

  it("should renders correct class name", async () => {
    const rootClassName = "test-root";
    const buttonClassName = "test-button";
    const inputClassName = "test-input";
    const inputWrapperClassName = "test-input-wrapper";

    const { container } = render(
      <SearchBar
        value="test"
        autoFocus
        className={rootClassName}
        buttonClassName={buttonClassName}
        inputClassName={inputClassName}
        inputWrapperClassName={inputWrapperClassName}
      />
    );

    const rootElement = container.querySelector("form");
    const buttonElement = container.querySelector("button");
    const inputElement = container.querySelector("input");
    const inputWrapperElement = container.querySelector("div");

    expect(rootElement).toHaveClass(rootClassName);
    expect(buttonElement).toHaveClass(buttonClassName);
    expect(inputElement).toHaveClass(inputClassName);
    expect(inputWrapperElement).toHaveClass(inputWrapperClassName);
  });
});
