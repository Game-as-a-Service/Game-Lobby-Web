import { render } from "@testing-library/react";
import { Toast } from "./Toast";

describe("Toast", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Toast />);
    expect(baseElement).toBeTruthy();
  });

  it("should render children", () => {
    const { baseElement } = render(<Toast>Test</Toast>);
    expect(baseElement.textContent).toContain("Test");
  });

  it("should render with correct state", () => {
    const { baseElement } = render(<Toast state={"success"}>Test</Toast>);
    expect(baseElement.querySelector(".bg-green-500")).toBeTruthy();
  });

  it("should render with correct size", () => {
    const { baseElement } = render(<Toast size={"lg"}>Test</Toast>);
    expect(baseElement.querySelector(".text-xl")).toBeTruthy();
  });

  it("should render with correct rounded", () => {
    const { baseElement } = render(<Toast rounded={"lg"}>Test</Toast>);
    expect(baseElement.querySelector(".rounded-\\[21px\\]")).toBeTruthy();
  });

  it("should render with correct length", () => {
    const { baseElement } = render(<Toast length={"md"}>Test</Toast>);
    expect(baseElement.querySelector(".w-\\[350px\\]")).toBeTruthy();
  });

  it("should render with correct className", () => {
    const { baseElement } = render(<Toast className={"test"}>Test</Toast>);
    expect(baseElement.querySelector(".test")).toBeTruthy();
  });
});
