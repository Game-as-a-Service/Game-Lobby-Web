import { cn } from "@/lib/utils";
import React, { forwardRef, useMemo } from "react";

export type BoxFancyBorderSizeVariant =
  | "none"
  | "small"
  | "medium"
  | "large"
  | "xLarge"
  | "extraLarge";
export type BoxFancyBorderRadiusVariant = BoxFancyBorderSizeVariant | "full";
export type BoxFancyBorderGradientVariant = "none" | "purple" | "black";

// Gradient border with semi-transparent background tips:
// The border-radius of ::before should be as consistent as possible with the original,
// and the border-radius size must be at least twice that of ::before.padding,
// otherwise, the inner circle will protrude.
const BorderSizeTwClassName: Record<BoxFancyBorderSizeVariant, string> = {
  none: "",
  small: "p-[1px] before:p-[1px]",
  medium: "p-1 before:p-1",
  large: "p-1.5 before:p-1.5",
  xLarge: "p-2 before:p-2",
  extraLarge: "p-3 before:p-3",
};

const BorderRadiusTwClassName: Record<BoxFancyBorderRadiusVariant, string> = {
  none: "",
  small: "rounded-sm before:rounded-sm",
  medium: "rounded-lg before:rounded-lg",
  large: "rounded-xl before:rounded-xl",
  xLarge: "rounded-2xl before:rounded-2xl",
  extraLarge: "rounded-3xl before:rounded-3xl",
  full: "rounded-full before:rounded-full",
};

const BorderGradientVariantTwClassName: Record<
  BoxFancyBorderGradientVariant,
  string
> = {
  none: "",
  purple: "before:gradient-purple",
  black: "before:gradient-black",
};

interface BoxFancyMainProps {
  /** Border styles are recommended to be set by the following 'border' prefix props **/
  borderSize?: BoxFancyBorderSizeVariant;
  borderRadius?: BoxFancyBorderRadiusVariant;
  /** The border gradient color of the BoxFancy. If you set a border color by className or style, this should be covered. */
  borderGradientColor?: BoxFancyBorderGradientVariant;
  /** An object used to set the CSS styles of the BoxFancy. This is an optional property. */
  style?: React.CSSProperties;
  /** For BoxFancy class name */
  className?: string;
}

export type BoxFancyProps = React.PropsWithChildren<BoxFancyMainProps>;

const InternalBoxFancy: React.ForwardRefRenderFunction<
  HTMLDivElement,
  BoxFancyProps
> = (props, ref) => {
  const {
    children,
    borderSize = "small",
    borderRadius = "xLarge",
    borderGradientColor = "purple",
    style,
    className,
    ...restProps
  } = props;

  const borderSizeTwClassName = BorderSizeTwClassName[borderSize];
  const borderRadiusTwClassName = BorderRadiusTwClassName[borderRadius];
  const borderGradientColorTwClassName =
    BorderGradientVariantTwClassName[borderGradientColor];

  const allClassName = useMemo(() => {
    return cn(
      "w-full h-full relative bg-black/40 effect-new-2 text-primary-50",
      "flex justify-center",
      "before:w-full before:h-full before:absolute before:top-0 before:left-0",
      "before:[mask:linear-gradient(#fff_0_0)_exclude_content-box,linear-gradient(#fff_0_0)]",
      borderSizeTwClassName,
      borderRadiusTwClassName,
      borderGradientColorTwClassName,
      className
    );
  }, [
    borderGradientColorTwClassName,
    borderRadiusTwClassName,
    borderSizeTwClassName,
    className,
  ]);

  return (
    <>
      <div ref={ref} className={allClassName} style={style} {...restProps}>
        {children}
      </div>
    </>
  );
};

/**
 * The `BoxFancy` component enables the display of a div with a gradient-colored border and default effects.
 *
 * Avoid using it if these features are unnecessary.
 *
 * Usage suggestions:
 *
 * 1. The inner radius will appear awkward if the `borderRadius` prop is less than the `borderSize` prop.
 *
 * 2. Avoid modifying the CSS `position` property directly. If necessary, consider using a container to encapsulate it.
 */
export const BoxFancy = forwardRef<HTMLDivElement, BoxFancyProps>(
  InternalBoxFancy
);
