import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import InputOTP from ".";

describe("InputOTP", () => {
  it("should render InputOTP component", () => {
    const label = "Input OTP";
    render(<InputOTP label={label} value="" length={6} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("should render 8 input fields when length is 8", () => {
    render(<InputOTP value="" length={8} />);
    const InputOTPs = screen.getAllByRole("textbox");
    expect(InputOTPs.length).toBe(8);
  });

  it("should set number when user types in the fields", async () => {
    const onChangeMock = jest.fn();
    render(<InputOTP value="" length={4} onChange={onChangeMock} />);
    const InputOTPs = screen.getAllByRole("textbox");
    const firstField = InputOTPs[0];
    const secondField = InputOTPs[1];
    const thirdField = InputOTPs[2];
    const fourthField = InputOTPs[3];

    await act(async () => {
      await userEvent.type(firstField, "1");
      await userEvent.type(secondField, "2");
      await userEvent.type(thirdField, "3");
      await userEvent.type(fourthField, "4");
    });
    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(onChangeMock).toHaveBeenCalledWith("1");
    expect(onChangeMock).toHaveBeenCalledWith("12");
    expect(onChangeMock).toHaveBeenCalledWith("123");
    expect(onChangeMock).toHaveBeenLastCalledWith("1234");
  });

  it("should remove number in the fields", async () => {
    const onChangeMock = jest.fn();
    render(<InputOTP value="12345" length={5} onChange={onChangeMock} />);
    const InputOTPs = screen.getAllByRole("textbox");
    const secondField = InputOTPs[1];
    await act(async () => {
      await userEvent.type(secondField, "{Backspace}{Backspace}");
    });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    expect(onChangeMock).toHaveBeenCalledWith("1345");
    expect(onChangeMock).toHaveBeenCalledWith("345");
    await act(async () => {
      await userEvent.type(secondField, "{Delete}");
    });
    expect(onChangeMock).toHaveBeenCalledTimes(3);
    expect(onChangeMock).toHaveBeenCalledWith("45");
    await act(async () => {
      await userEvent.type(secondField, "{Delete}");
    });
    expect(onChangeMock).toHaveBeenCalledTimes(4);
    expect(onChangeMock).toHaveBeenCalledWith("5");
    await act(async () => {
      await userEvent.type(secondField, "{Delete}");
    });
    expect(onChangeMock).toHaveBeenCalledTimes(5);
    expect(onChangeMock).toHaveBeenCalledWith("");
  });

  it("should move focus when user presses arrow keys", async () => {
    render(<InputOTP value="" length={3} />);
    const InputOTPs = screen.getAllByRole("textbox");
    const secondField = InputOTPs[1];
    const thirdField = InputOTPs[2];
    await act(async () => {
      await userEvent.type(secondField, "{ArrowRight}");
    });
    expect(thirdField).toHaveFocus();
    await act(async () => {
      await userEvent.type(thirdField, "{ArrowRight}");
    });
    expect(thirdField).toHaveFocus();
    await act(async () => {
      await userEvent.type(secondField, "{ArrowLight}");
    });
    expect(thirdField).not.toHaveFocus();
    expect(secondField).toHaveFocus();
  });
});
