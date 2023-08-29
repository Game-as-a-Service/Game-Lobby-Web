import React from "react";
import { render } from "@testing-library/react";
import GameWindow from "./GameWindow";

describe("GameWindow", () => {
  it("renders an iframe with the provided gameUrl", () => {
    const gameUrl = "https://example.com/game";
    const { container } = render(<GameWindow gameUrl={gameUrl} />);

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", gameUrl);
  });

  it("renders a fallback message when iframe is not supported", () => {
    const gameUrl = "https://example.com/game";
    const { container, getByText } = render(<GameWindow gameUrl={gameUrl} />);

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();

    expect(
      getByText("Your browser does not support iframes.")
    ).toBeInTheDocument();
  });
});
