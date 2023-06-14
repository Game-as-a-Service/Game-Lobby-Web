import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RoomChatroom from "./RoomChatroom";

describe("RoomChatroom", () => {
  // mock scrollTo fn
  const scrollToMock = jest.fn();
  const originalScrollTo = window.HTMLElement.prototype.scrollTo;
  window.HTMLElement.prototype.scrollTo = scrollToMock;

  it("should clean the input value when click submit button", () => {
    const { getByRole, getByText } = render(<RoomChatroom roomId="test" />);

    const textarea = getByRole("textarea") as HTMLTextAreaElement;
    const submitButton = getByText("發送");

    fireEvent.change(textarea, { target: { value: "測試輸入" } });
    fireEvent.click(submitButton);

    expect(textarea.value).toBe("");
  });

  it("should clean the input value when keydown Enter", () => {
    const { getByRole } = render(<RoomChatroom roomId="test" />);
    const textarea = getByRole("textarea") as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "ABC" } });
    fireEvent.keyDown(textarea, { code: "Enter" });

    expect(textarea.value).toBe("");
  });

  it("shouldn't clean the input value when keydown shift + Enter", () => {
    const { getByRole } = render(<RoomChatroom roomId="test" />);
    const textarea = getByRole("textarea") as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "ABC" } });
    fireEvent.keyDown(textarea, { code: "Enter", shiftKey: true });

    expect(textarea.value).toBe("ABC");
  });

  it("shouldn't clean the input value when keydown Enter, but key is 'Process' ", () => {
    const { getByRole } = render(<RoomChatroom roomId="test" />);
    const textarea = getByRole("textarea") as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "ABC" } });
    fireEvent.keyDown(textarea, { code: "Enter", key: "Process" });

    expect(textarea.value).toBe("ABC");

    // reset to origin scrollTo fn
    window.HTMLElement.prototype.scrollTo = originalScrollTo;
  });
});
