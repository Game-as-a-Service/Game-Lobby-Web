import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SearchBar from ".";

describe("SearchBar", () => {
  it("should renders input component with correct value", async () => {
    const mockSubmit = jest.fn();

    render(<SearchBar onSubmit={mockSubmit} buttonSlot="submit" />);

    const inputElement = screen.getByRole<HTMLInputElement>("search");
    const buttonElement = screen.getByRole<HTMLInputElement>("button");

    expect(inputElement).toBeInTheDocument();

    const typingValue = "search";

    await act(async () => {
      await userEvent.type(inputElement, typingValue);
      await userEvent.click(buttonElement);
    });

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenLastCalledWith(typingValue);
    expect(inputElement.value).toBe(typingValue);
  });
});
