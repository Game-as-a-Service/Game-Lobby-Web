import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserCard, { UserCardProps } from "./UserCard";

describe("UserCard", () => {
  describe("Available UserCard", () => {
    it("should render with waiting text", () => {
      const userCard = render(<UserCard isWating />);

      expect(userCard.baseElement).toHaveTextContent("等待中...");
    });
  });

  describe("Disabled UserCard", () => {
    it("should render with empty textContent", () => {
      const userCard = render(<UserCard disabled />);

      expect(userCard.baseElement).toHaveTextContent("");
    });
  });

  describe("UserCard with user", () => {
    const UserProp: UserCardProps = {
      id: "testId",
      nickname: "testNickname",
      isReady: false,
      isSelf: false,
      isHost: false,
    };

    it("should render with correct nickname", () => {
      render(<UserCard {...UserProp} />);

      expect(screen.getByText(UserProp.nickname)).toBeInTheDocument();
    });

    it("should render with ready status text when user is ready", () => {
      const userCard = render(<UserCard {...UserProp} isReady />);

      expect(userCard.getByText("已準備")).toBeInTheDocument();
    });

    it("should render text with 'you' when it represents user self", () => {
      const userCard = render(<UserCard {...UserProp} isSelf />);

      expect(userCard.baseElement.textContent).toMatch(/你/);
      expect(userCard.baseElement.textContent).not.toMatch(/mynickname/);
    });

    it("should render host suffix text when user is host ", () => {
      const userCard = render(<UserCard {...UserProp} isHost />);

      expect(userCard.baseElement.textContent).toMatch(/(房主)/);
    });

    it("should render with correct nickname when it represents both of user self and host", () => {
      const userCard = render(<UserCard {...UserProp} isHost isSelf />);

      expect(userCard.baseElement.textContent).toMatch(/你/);
      expect(userCard.baseElement.textContent).toMatch(/(房主)/);
      expect(userCard.baseElement.textContent).not.toMatch(/mynickname/);
    });

    it("shouldn't render kick button on right top when not recived onKickUser prop", () => {
      render(<UserCard {...UserProp} />);

      expect(screen.queryByTestId("kick-user-svg")).toBeFalsy();
    });

    // it("shouldn render kick button on right top when recived onKickUser prop", () => {
    //   render(<UserCard {...UserProp} onKickUser={() => {}} />);

    //   expect(screen.queryByTestId("kick-user-svg")).not.toBeFalsy();
    // });
  });
});
