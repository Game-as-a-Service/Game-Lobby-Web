import React, { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import BoxFancy, { BoxFancyBorderGradientVariant } from "../BoxFancy";
import { PolymorphicRef } from "@/lib/types";

export enum ButtonVariant {
  PRIMARY = "primary",
  PRIMARY_TRANSPARENT = "primaryTransparent",
  SECONDARY = "secondary",
  HIGHLIGHT = "highlight",
}

export enum ButtonSize {
  Icon = "icon",
  REGULAR = "regular",
  SMALL = "small",
}

const commonDisabledClasses =
  "disabled:cursor-not-allowed disabled:bg-none disabled:bg-grey-800 disabled:border-grey-500 disabled:text-grey-200 disabled:stroke-grey-200 disabled:fill-grey-200";

const buttonTypeClasses: Record<ButtonVariant, string> = {
  primary:
    "text-primary-700 bg-primary-200 hover:text-primary-50 hover:bg-primary-300 active:text-primary-50 active:bg-primary-400",
  primaryTransparent:
    "text-primary-800 bg-primary-200/60 hover:text-primary-800 hover:bg-primary-300/50 active:text-primary-800 active:bg-primary-300/50",
  secondary:
    "text-primary-200 bg-primary-700/0 hover:bg-primary-700/40 active:bg-primary-200/20",
  highlight:
    "text-primary-50 gradient-purple hover:gradient-purple-2 active:gradient-purple-3",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  icon: "p-2",
  small: "py-0 px-4 gap-1",
  regular: "py-2 px-6 gap-2",
};

interface BaseButtonProps {
  variant?: ButtonVariant | `${ButtonVariant}`;
  size?: ButtonSize;
  asChild?: boolean;
}

type ButtonProps = BaseButtonProps & React.ComponentPropsWithoutRef<"button">;

type InnerButtonComponent = (
  props: ButtonProps,
  ref?: PolymorphicRef<"button">
) => React.ReactElement | null;

const InternalButton: InnerButtonComponent = (
  {
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.REGULAR,
    asChild,
    disabled,
    className,
    children,
    onClick,
    ...otherButtonAttributes
  },
  ref
) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [disabled, onClick]
  );

  const boxFancyClassName = cn(
    "w-fit items-center fz-16-b transition-colors transition-[border-image] ease-in whitespace-nowrap",
    commonDisabledClasses,
    buttonTypeClasses[variant],
    buttonSizeClasses[size],
    className
  );

  const borderGradientColor: BoxFancyBorderGradientVariant =
    variant === ButtonVariant.SECONDARY && !disabled ? "purple" : "none";

  return (
    <BoxFancy
      ref={ref}
      asChild={asChild}
      component={"button"}
      borderRadius="full"
      borderGradientColor={borderGradientColor}
      className={boxFancyClassName}
      onClick={handleClick}
      disabled={disabled}
      {...otherButtonAttributes}
    >
      {children}
    </BoxFancy>
  );
};

const Button = forwardRef(InternalButton);

export default Button;
