import React from "react";
import { render, screen } from "@testing-library/react";
import {
  BoxFancy,
  BoxFancyBorderGradientVariant,
  BoxFancyBorderRadiusVariant,
  BoxFancyBorderWidthVariant,
  BoxFancyProps,
} from "./BoxFancy";

type ClassesFoundTest = {
  classes: string;
  found: boolean;
};

type BorderWidthTest = {
  borderWidth?: BoxFancyBorderWidthVariant;
} & ClassesFoundTest;

type BorderRadiusTest = {
  borderRadius?: BoxFancyBorderRadiusVariant;
} & ClassesFoundTest;

type BorderGradientTest = {
  borderGradientColor?: BoxFancyBorderGradientVariant;
} & ClassesFoundTest;

const borderRadiusTestTable: BorderRadiusTest[] = [
  { borderRadius: "none", classes: "rounded-2xl", found: false },
  { borderRadius: "small", classes: "rounded-sm", found: true },
  { borderRadius: "medium", classes: "rounded-lg", found: true },
  { borderRadius: "large", classes: "rounded-xl", found: true },
  { borderRadius: "xLarge", classes: "rounded-2xl", found: true },
  { borderRadius: "extraLarge", classes: "rounded-3xl", found: true },
  { borderRadius: "full", classes: "rounded-full", found: true },
];

const borderGradientTestTable: BorderGradientTest[] = [
  {
    borderGradientColor: "none",
    classes: "gradient-purple",
    found: false,
  },
  {
    borderGradientColor: "purple",
    classes: "gradient-purple",
    found: true,
  },
  {
    borderGradientColor: "black",
    classes: "gradient-black",
    found: true,
  },
];

describe("BoxFancy", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<BoxFancy />);
    expect(baseElement).toBeTruthy();
  });

  it("should render children", () => {
    const { baseElement } = render(<BoxFancy>Test</BoxFancy>);
    expect(baseElement.textContent).toContain("Test");
  });

  it.each`
    borderWidth     | className
    ${"small"}      | ${"p-px"}
    ${"medium"}     | ${"p-1"}
    ${"large"}      | ${"p-1.5"}
    ${"xLarge"}     | ${"p-2"}
    ${"extraLarge"} | ${"p-3"}
  `(
    "should render with correct $borderWidth border size",
    ({ borderWidth, className }) => {
      render(<BoxFancy borderWidth={borderWidth}>Box Fancy</BoxFancy>);

      expect(screen.getByText("Box Fancy")).toHaveClass(className);
    }
  );

  it.each<BorderRadiusTest>(borderRadiusTestTable)(
    "should render with correct border radius",
    ({ borderRadius, classes, found }) => {
      const { baseElement } = render(
        <BoxFancy borderRadius={borderRadius}>Test</BoxFancy>
      );

      const matchers = [
        () => expect(baseElement.querySelector(`.${classes}`)),
        () => expect(baseElement.querySelector(`.before\\:${classes}`)),
      ];
      matchers.forEach((matcher) =>
        found ? matcher().toBeTruthy() : matcher().toBeFalsy()
      );
    }
  );

  it.each<BorderGradientTest>(borderGradientTestTable)(
    "should render with correct border gradient color",
    ({ borderGradientColor, classes, found }) => {
      const { baseElement } = render(
        <BoxFancy borderGradientColor={borderGradientColor}>Test</BoxFancy>
      );

      const matchers = [
        () => expect(baseElement.querySelector(`.before\\:${classes}`)),
      ];
      matchers.forEach((matcher) =>
        found ? matcher().toBeTruthy() : matcher().toBeFalsy()
      );
    }
  );

  it("renders with other custom props", () => {
    const customProps: BoxFancyProps = {
      style: { backgroundColor: "red" },
      className: "custom-class",
    };

    const { container } = render(
      <BoxFancy {...customProps}>Custom Content</BoxFancy>
    );

    const targetElement = container.firstChild;
    expect(targetElement).toBeInTheDocument();
    expect(targetElement).toHaveClass("custom-class");
    expect(targetElement).toHaveStyle("background-color: red");
  });

  it("should render with ref", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<BoxFancy ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });

  it("should render with component(element tag) and ref", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BoxFancy component="input" ref={ref} type="number" defaultValue="123" />
    );
    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.value).toEqual("123");
  });
});
