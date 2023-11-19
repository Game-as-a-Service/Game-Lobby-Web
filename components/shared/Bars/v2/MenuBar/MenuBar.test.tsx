import { cleanup, render, screen } from "@testing-library/react";
import MenuBar from "./MenuBar";
import "@testing-library/jest-dom";
import React from "react";

describe("MenuBar", () => {
  afterEach(cleanup);

  it("MenuBar", () => {
    render(<MenuBar />);
    expect(screen.getByText("遊戲微服務大平台")).toBeInTheDocument();
  });
});
