import { cleanup, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";
import React from "react";

describe("SearchBar", () => {
  afterEach(cleanup);

  it("SearchBar", () => {
    render(<SearchBar />);
    expect(screen.getByText("遊戲微服務大平台")).toBeInTheDocument();
  });
});
