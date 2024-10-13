import React, { ReactNode, forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import BoxFancy, { BoxFancyBorderGradientVariant } from "../../BoxFancy";
import { IconNameV2 } from "@/components/shared/Icon/v2/icons";
import Icon from "@/components/shared/Icon/v2";
import { PolymorphicRef } from "@/lib/types";

export enum ButtonVariant {
  PRIMARY = "primary",
  PRIMARY_TRANSPARENT = "primaryTransparent",
  SECONDARY = "secondary",
  HIGHLIGHT = "highlight",
}

export enum ButtonSize {
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
    "text-primary-200 bg-transparent hover:bg-primary-300/40 active:bg-primary-200/20 disabled:bg-transparent disabled:border",
  highlight:
    "text-primary-50 gradient-purple hover:gradient-purple-2 active:gradient-purple-3",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  small: "h-9 px-4 gap-1",
  regular: "h-11 px-6 gap-2",
};

interface BaseButtonProps {
  variant?: ButtonVariant | `${ButtonVariant}`;
  size?: ButtonSize;
  icon?: ReactNode;
  iconName?: IconNameV2;
  iconClassName?: string;
}

type ButtonProps = BaseButtonProps & React.ComponentPropsWithoutRef<"button">;

type InnerButtonComponent = (
  props: ButtonProps,
  ref?: PolymorphicRef<"button">
) => React.ReactElement | null;

const iconTypeClasses: Record<ButtonVariant, string> = {
  primary:
    "stroke-primary-700 hover:stroke-primary-50 active:stroke-primary-50",
  primaryTransparent:
    "stroke-primary-700 hover:stroke-primary-700 active:stroke-primary-700",
  secondary: "stroke-primary-200 disabled:stroke-grey-500",
  highlight: "stroke-primary-50",
};

const InteralButton: InnerButtonComponent = (
  {
    variant = ButtonVariant.PRIMARY,
    size = ButtonSize.REGULAR,
    icon,
    iconName,
    disabled,
    className,
    iconClassName,
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
    "w-fit items-center fz-16-b transition-colors transition-[border-image] ease-in",
    commonDisabledClasses,
    buttonTypeClasses[variant],
    buttonSizeClasses[size],
    iconTypeClasses[variant],
    className
  );
  const iconClasses = cn("w-6 h-6 stroke-inherit", iconClassName);

  const borderGradientColor: BoxFancyBorderGradientVariant =
    variant === ButtonVariant.SECONDARY && !disabled ? "purple" : "none";

  return (
    <BoxFancy
      ref={ref}
      component={"button"}
      borderRadius="full"
      borderGradientColor={borderGradientColor}
      className={boxFancyClassName}
      onClick={handleClick}
      disabled={disabled}
      {...otherButtonAttributes}
    >
      {icon || (iconName && <Icon name={iconName} className={iconClasses} />)}
      <span>{children}</span>
    </BoxFancy>
  );
};

export const Button = forwardRef(InteralButton);
