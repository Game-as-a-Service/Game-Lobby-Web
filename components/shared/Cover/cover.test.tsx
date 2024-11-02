import React from "react";
import { render, screen } from "@testing-library/react";
import Cover from ".";

describe("Cover", () => {
  test("should render Cover component", () => {
    render(
      <Cover
        src="https://images.unsplash.com/photo-1683125695370-1c7fc9ff1315?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160"
        alt="Cover"
        width={300}
        height={300}
      />
    );
    const cover = screen.getByRole("img");
    expect(cover).toBeInTheDocument();
    expect(cover).toHaveAccessibleName("Cover");
  });
});
