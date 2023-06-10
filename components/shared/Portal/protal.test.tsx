import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Portal from "./Portal";
import React from "react";

describe("Portal", () => {
  it("should mount the children inside the portal-root element", async () => {
    const children = <div data-testid="test">Test</div>;
    render(<Portal>{children}</Portal>);

    const portalRoot = document.getElementById("portal-root");
    const testElement = screen.getByTestId("test");

    expect(portalRoot).toBeInTheDocument();
    expect(testElement).toBeInTheDocument();
    expect(portalRoot?.contains(testElement)).toBe(true);
    expect(testElement.parentElement).toEqual(portalRoot);
  });

  it("should mount the children inside a custom root element", () => {
    const rootId = "custom-root";
    const children = <div data-testid="test">Custom root</div>;
    render(<Portal rootId={rootId}>{children}</Portal>);

    const customRoot = document.getElementById(rootId);
    const testElement = screen.getByTestId("test");

    expect(customRoot).toBeInTheDocument();
    expect(testElement).toBeInTheDocument();
    expect(customRoot?.contains(testElement)).toBe(true);
    expect(testElement.parentElement).toEqual(customRoot);
  });
});
