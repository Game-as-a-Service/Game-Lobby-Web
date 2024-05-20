import React, { ReactNode, forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import BoxFancy, { BoxFancyBorderGradientVariant } from "../../BoxFancy";
import { IconName } from "@/components/shared/Icon/icons";
import Icon from "@/components/shared/Icon";
import { PolymorphicRef } from "@/lib/types";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  HIGHLIGHT = "highlight",
}

export enum ButtonSize {
  REGULAR = "regular",
  SMALL = "small",
}

const commonDisabledClasses =
  "disabled:cursor-not-allowed disabled:bg-gray-800 disabled:border-gray-500 disabled:text-gray-200 disabled:stroke-gray-200 disabled:fill-gray-200";

const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    "text-primary-700 bg-primary-200 hover:text-primary-50 hover:bg-primary-300 active:text-primary-50 active:bg-primary-400",
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
  variant?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
  iconName?: IconName;
  iconClassName?: string;
}

type ButtonProps = BaseButtonProps & React.ComponentPropsWithoutRef<"button">;

type InnerButtonComponent = (
  props: ButtonProps,
  ref?: PolymorphicRef<"button">
) => React.ReactElement | null;

const iconTypeClasses: Record<ButtonType, string> = {
  primary:
    "stroke-primary-700 hover:stroke-primary-50 active:stroke-primary-50",
  secondary: "stroke-primary-200 disabled:stroke-gray-500",
  highlight: "stroke-primary-50",
};

const InteralButton: InnerButtonComponent = (
  {
    variant = ButtonType.PRIMARY,
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
    "w-full items-center fz-16-b transition-colors transition-[border-image] ease-in",
    commonDisabledClasses,
    buttonTypeClasses[variant],
    buttonSizeClasses[size],
    iconTypeClasses[variant],
    className
  );
  const iconClasses = cn("w-6 h-6 stroke-inherit", iconClassName);

  const borderGradientColor: BoxFancyBorderGradientVariant =
    variant === ButtonType.SECONDARY && !disabled ? "purple" : "none";

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
