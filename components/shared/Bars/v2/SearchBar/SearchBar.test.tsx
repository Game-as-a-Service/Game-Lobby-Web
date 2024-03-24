import { cleanup, render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom";
import React from "react";

describe("SearchBar", () => {
  afterEach(cleanup);

  it("SearchBar", () => {
    let flagText = false;
    let flagType = false;
    render(
      <SearchBar
        onSearchText={(text: string) => {
          flagText = true;
        }}
        onSearchType={(text: string) => {
          flagType = true;
        }}
      />
    );
    // TODO: texting Search Input then click Search Button
    expect(flagText).toBeTruthy();
    // TODO: Click drawer button then click any type button
    expect(flagType).toBeTruthy();
  });
});
