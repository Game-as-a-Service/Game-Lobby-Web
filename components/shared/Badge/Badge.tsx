import { cn } from "@/lib/utils";
import React from "react";

enum BadgeSizeVariant {
  small = "small",
  medium = "medium",
  large = "large",
  xLarge = "xLarge",
  extraLarge = "extraLarge",
}

enum BadgePositionVariant {
  "top-left" = "top-left",
  "top-right" = "top-right",
  "bottom-left" = "bottom-left",
  "bottom-right" = "bottom-right",
}

export const positionVariants: Record<BadgePositionVariant, string> = {
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
};

const textSizeVariants: Record<BadgeSizeVariant, string> = {
  small: "text-xs",
  medium: "text-sm",
  large: "text-base",
  xLarge: "text-lg",
  extraLarge: "text-xl",
};

const dotSizeVariants: Record<BadgeSizeVariant, string> = {
  small: "w-1 h-1",
  medium: "w-2 h-2",
  large: "w-3 h-3",
  xLarge: "w-4 h-4",
  extraLarge: "w-5 h-5",
};

interface BadgeProps {
  /** The number or content displayed on the badge. It can be a React element, such as an icon, or a string or number. Default value is 0. */
  count?: React.ReactNode;
  /** The size of badge. It can be "xSmall", "small", "medium", "large", or "xlarge". Default is "medium". */
  size?: keyof typeof BadgeSizeVariant;
  /** When the value of count exceeds overflowCount, it will be truncated and replaced with ${overflowCount}+. Default value is 99.*/
  overflowCount?: number;
  /** If true, the badge will display a dot instead of the number or content. If false, the badge will display the content of count. Default is false. */
  dot?: boolean;
  /** The background color of the badge. It can be a CSS color value or any valid CSS background value. Default value is #f85149. */
  color?: string;
  /** The placement of the badge. It can be "top-left", "top-right", "bottom-left", or "bottom-right". Default is "top-right". */
  placement?: keyof typeof BadgePositionVariant;
  /** An object used to set the CSS styles of the badge. This is an optional property. */
  style?: React.CSSProperties;
  /** The element used to wrap the badge content. It can be a React element or an array containing other elements. */
  children?: React.ReactNode;
  /** If true, the badge will be displayed even when the value of count is 0. If false, the badge will not be displayed when the value of count is 0. Default is false. */
  showZero?: boolean;
  /** For badge class name */
  className?: string;
}

const InternalBadge: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  BadgeProps
> = (props, ref) => {
  const {
    children,
    count = 0,
    overflowCount = 99,
    dot = false,
    style,
    color = "#f85149",
    placement = "top-right",
    showZero = true,
    size = "medium",
    className,
    ...restProps
  } = props;

  const displayCount =
    count && (count as number) > overflowCount ? `${overflowCount}+` : count;
  const isZero = displayCount === "0" || displayCount === 0;
  const showAsDot = dot && !isZero;
  const hidden = (!showZero && isZero) || (dot && isZero);

  const badgeClassName = cn(
    "badge__content",
    "rounded-full absolute",
    positionVariants[placement],
    dot
      ? `badge__dot ${dotSizeVariants[size]}`
      : `badge__count ${textSizeVariants[size]} flex flex-row flex-wrap justify-center items-center box-border font-medium min-w-fit px-1.5 py-0.5 h-auto z-10 text-white`,
    hidden && "hidden",
    className
  );

  return (
    <>
      <span
        className="badge__container relative inline-flex"
        ref={ref}
        {...restProps}
      >
        {children}
        <div
          className={badgeClassName}
          style={{ backgroundColor: color, ...style }}
        >
          {!showAsDot && !hidden && <span>{displayCount}</span>}
        </div>
      </span>
    </>
  );
};

/**
 * `Badge` component allows us to display a small badge in the top-right corner (default position) of its children element.
 * It is commonly used to indicate the number of pending messages or notifications that require attention.
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  InternalBadge
);
