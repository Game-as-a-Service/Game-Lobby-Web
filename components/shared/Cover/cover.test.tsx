import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cover from ".";

describe("Cover", () => {
  const image = {
    src: "https://images.unsplash.com/photo-1683125695370-1c7fc9ff1315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160",
    alt: "Cover1",
  };

  test("should render", () => {
    render(<Cover {...image} />);
    const _img = document.querySelector("img");
    expect(_img).toBeInTheDocument();
    expect(_img?.alt).toBe("Cover1");
    expect(_img?.src).toMatch(/photo-1683125695370-1c7fc9ff1315/i);
  });
});
