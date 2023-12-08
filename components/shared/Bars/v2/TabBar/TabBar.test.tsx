import { cleanup, render, screen } from "@testing-library/react";
import TabBar from "./TabBar";
import "@testing-library/jest-dom";
import React from "react";

describe("TabBar", () => {
  afterEach(cleanup);

  it("TabBar", () => {
    render(
      <TabBar
        tabList={["熱門遊戲", "最新遊戲", "上次遊玩", "好評遊戲", "收藏遊戲"]}
      />
    );
    expect(screen.getByText("熱門遊戲")).toBeInTheDocument();
  });
});
