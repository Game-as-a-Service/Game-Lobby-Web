import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard from "./UserCard";

describe("UserCard", () => {
  it('should render UserCard with waiting text when "isWating" prop is true', () => {
    const userCard = render(<UserCard isWating />);

    expect(userCard.baseElement).toHaveTextContent("等待中...");
  });

  it("should render UserCard without textContent when 'disabled' prop is true", () => {
    const userCard = render(<UserCard disabled />);

    expect(userCard.baseElement).toHaveTextContent("");
  });

  it("should render UserCard with correct nickName", () => {
    render(<UserCard nickName="myNickName" />);

    expect(screen.getByText("myNickName")).toBeInTheDocument();
  });

  it("should render UserCard with correct nickName suffix text when 'isHost' is true ", () => {
    const userCard = render(<UserCard isHost nickName="myNickName" />);

    expect(userCard.baseElement.textContent).toMatch(/(房主)/);
  });

  it("should render UserCard with ready status text when 'isReady' prop is true", () => {
    const userCard = render(<UserCard isReady nickName="myNickName" />);

    expect(userCard.getByText("已準備")).toBeInTheDocument();
  });

  it("should render UserCard with correct nickName when 'isSelf prop is true", () => {
    const userCard = render(<UserCard isSelf nickName="myNickName" />);

    expect(userCard.baseElement.textContent).toMatch(/你/);
    expect(userCard.baseElement.textContent).not.toMatch(/myNickName/);
  });

  it("should render UserCard with correct nickName when 'isHost' and 'isSelf' prop is true", () => {
    const userCard = render(<UserCard nickName="myNickName" isHost isSelf />);

    expect(userCard.baseElement.textContent).toMatch(/你/);
    expect(userCard.baseElement.textContent).toMatch(/(房主)/);
    expect(userCard.baseElement.textContent).not.toMatch(/myNickName/);
  });
});
