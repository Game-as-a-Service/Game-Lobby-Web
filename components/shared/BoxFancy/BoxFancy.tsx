import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";
import type { PolymorphicComponentProp, PolymorphicRef } from "@/lib/types";

export type BoxFancyBorderWidthVariant =
  | "none"
  | "small"
  | "medium"
  | "large"
  | "xLarge"
  | "extraLarge";
export type BoxFancyBorderRadiusVariant = BoxFancyBorderWidthVariant | "full";
export type BoxFancyBorderGradientVariant =
  | "none"
  | "purple"
  | "black"
  | "cyberpunk";

// Gradient border with semi-transparent background tips:
// The border-radius of ::before should be as consistent as possible with the original,
// and the border-radius size must be at least twice that of ::before.padding,
// otherwise, the inner circle will protrude.
const borderWidthMap: Record<BoxFancyBorderWidthVariant, string> = {
  none: "",
  small: "p-px before:p-px",
  medium: "p-1 before:p-1",
  large: "p-1.5 before:p-1.5",
  xLarge: "p-2 before:p-2",
  extraLarge: "p-3 before:p-3",
};

const borderRadiusMap: Record<BoxFancyBorderRadiusVariant, string> = {
  none: "",
  small: "rounded-sm before:rounded-sm",
  medium: "rounded-lg before:rounded-lg",
  large: "rounded-xl before:rounded-xl",
  xLarge: "rounded-2xl before:rounded-2xl",
  extraLarge: "rounded-3xl before:rounded-3xl",
  full: "rounded-full before:rounded-full",
};

const borderGradientVariantMap: Record<BoxFancyBorderGradientVariant, string> =
  {
    none: "",
    purple: "before:gradient-purple",
    black: "before:gradient-black",
    cyberpunk: "before:gradient-cyberpunk",
  };

export interface BaseBoxFancyProp {
  /** Border styles are recommended to be set by the following 'border' prefix props **/
  borderWidth?: BoxFancyBorderWidthVariant;
  /** Border styles are recommended to be set by the following 'border' prefix props **/
  borderRadius?: BoxFancyBorderRadiusVariant;
  /** The border gradient color of the BoxFancy. If you set a border color by className or style, this should be covered. */
  borderGradientColor?: BoxFancyBorderGradientVariant;
  /** If true, the component will be rendered as a child of the parent component. */
  asChild?: boolean;
}

export type BoxFancyProps<C extends React.ElementType = "div"> =
  PolymorphicComponentProp<C, BaseBoxFancyProp>;

type InternalBoxFancyComponent = <C extends React.ElementType = "div">(
  props: BoxFancyProps<C>,
  ref?: PolymorphicRef<C>
) => React.ReactElement | null;

const InternalBoxFancy: InternalBoxFancyComponent = (
  {
    component,
    asChild,
    borderWidth = "small",
    borderRadius = "xLarge",
    borderGradientColor = "purple",
    className,
    children,
    ...restProps
  },
  ref
) => {
  const Component = asChild ? React.Fragment : component || "div";

  const boxFancyClassName = cn(
    "relative bg-black/40 frosted-shadow-box text-primary-50",
    "before:w-full before:h-full before:absolute before:top-0 before:left-0 before:pointer-events-none",
    "before:[mask:linear-gradient(#fff_0_0)_exclude_content-box,linear-gradient(#fff_0_0)]",
    borderWidthMap[borderWidth],
    borderRadiusMap[borderRadius],
    borderGradientVariantMap[borderGradientColor],
    className
  );

  return (
    <Component ref={ref} className={boxFancyClassName} {...restProps}>
      {asChild && React.isValidElement(children)
        ? React.cloneElement(children, {
            ref,
            className: cn(boxFancyClassName, children.props.className),
            ...restProps,
          })
        : children}
    </Component>
  );
};

/**
 * The `BoxFancy` component enables the display of a div with a gradient-colored border and default effects.
 *
 * Avoid using it if these features are unnecessary.
 *
 * Usage suggestions:
 *
 * 1. The inner radius will appear awkward if the `borderRadius` prop is less than the `borderWdith` prop.
 *
 * 2. Avoid modifying the CSS `position` property directly. If necessary, consider using a container to encapsulate it.
 */
export const BoxFancy = forwardRef(InternalBoxFancy);
