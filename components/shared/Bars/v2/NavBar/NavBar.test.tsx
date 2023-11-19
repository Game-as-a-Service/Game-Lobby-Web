import { cleanup, render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import "@testing-library/jest-dom";
import React from "react";

describe("NavBar", () => {
  afterEach(cleanup);

  it("NavBar", () => {
    render(<NavBar />);
    expect(screen.getByText("遊戲微服務大平台")).toBeInTheDocument();
  });
});
