import React from "react";
import { render, screen } from "@testing-library/react";
import ChatMessage, { ChatMessageProps } from "./ChatMessage";
import { TEXT_COLORS_CLASS } from "./ChatMessage";

const TEST_USER_MESSAGE_PROPS = {
  from: { id: "test_user", nickname: "test_nickname" },
  content: "test textContent",
  timestamp: new Date().toISOString(),
  target: "LOBBY",
};

const TEST_SYSTEM_MESSAGE_PROPS: ChatMessageProps = {
  from: "SYSTEM",
  content: "test textContent",
  timestamp: new Date().toISOString(),
  target: "LOBBY",
};

describe("ChatMessage", () => {
  it('should render correct text with the given "content" prop', () => {
    render(<ChatMessage {...TEST_USER_MESSAGE_PROPS} />);
    const messageElement = screen.getByText(TEST_USER_MESSAGE_PROPS.content);

    expect(messageElement).toBeInTheDocument();
  });

  it('should render correct text color when prop "from" is "SYSTEM"', () => {
    const { container } = render(
      <ChatMessage {...TEST_SYSTEM_MESSAGE_PROPS} />
    );
    const rootElement = container.querySelector("div");

    expect(rootElement).toHaveClass(TEXT_COLORS_CLASS.SYSTEM);
  });

  it('should render correct text color when prop "from" is "USER"', () => {
    const { container } = render(<ChatMessage {...TEST_USER_MESSAGE_PROPS} />);
    const rootElement = container.querySelector("div");

    expect(rootElement).toHaveClass(TEXT_COLORS_CLASS.USER);
  });

  it('should render correct nickname when prop "from" is "USER"', () => {
    const { baseElement } = render(
      <ChatMessage {...TEST_USER_MESSAGE_PROPS} />
    );

    expect(baseElement.textContent).toMatch(
      TEST_USER_MESSAGE_PROPS.from.nickname
    );
  });
});
