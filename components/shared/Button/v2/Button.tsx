import React, {
  ElementType,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import BoxFancy, { BoxFancyBorderGradientVariant } from "../../BoxFancy";
import { IconName } from "@/components/shared/Icon/icons";
import Icon from "@/components/shared/Icon";
import { PolymorphicComponentProp, PolymorphicRef } from "@/lib/types";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  HIGHLIGHT = "highlight",
}

export enum ButtonSize {
  REGULAR = "regular",
  SMALL = "small",
}

const buttonTypeClasses: Record<ButtonType, string> = {
  primary:
    "text-primary-700 bg-primary-200 hover:text-primary-50 hover:bg-primary-300 active:text-primary-50 active:bg-primary-400",
  secondary:
    "text-primary-200 bg-transparent hover:bg-primary-300/40 active:bg-primary-200/20 disabled:bg-transparent disabled:border-grey-500 disabled:border",
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
  disabled?: boolean;
  // inner div className for styling
  boxFancyClassName?: string;
  iconClassName?: string;
}

type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentProp<
  C,
  BaseButtonProps
>;

type InnerButtonComponent = <C extends ElementType = "button">(
  props: ButtonProps<C>,
  ref?: PolymorphicRef<C>
) => React.ReactElement | null;

const iconTypeClasses: Record<ButtonType, string> = {
  primary:
    "stroke-primary-700 hover:stroke-primary-50 active:stroke-primary-50",
  secondary: "stroke-primary-200",
  highlight: "stroke-primary-50",
};

const InteralButton: InnerButtonComponent = (
  {
    component,
    variant = ButtonType.PRIMARY,
    size = ButtonSize.REGULAR,
    icon,
    iconName,
    disabled,
    className,
    boxFancyClassName,
    iconClassName,
    children,
    onClick,
    ...otherButtonAttributes
  },
  ref
) => {
  const Component = component || "button";
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

  const buttonClassName = useMemo(
    () =>
      cn(
        "w-full items-center fz-16-b transition-colors transition-[border-image] ease-in",
        "disabled:text-grey-200 disabled:bg-grey-800",
        buttonTypeClasses[variant],
        buttonSizeClasses[size],
        iconTypeClasses[variant],
        boxFancyClassName
      ),
    [boxFancyClassName, size, variant]
  );

  const iconClasses = useMemo(
    () => cn("w-6 h-6 stroke-inherit", iconClassName),
    [iconClassName]
  );

  const borderGradientColor: BoxFancyBorderGradientVariant =
    variant === ButtonType.SECONDARY && !disabled ? "purple" : "none";

  return (
    <Component
      ref={ref}
      className={className}
      onClick={handleClick}
      disabled={disabled}
      {...otherButtonAttributes}
    >
      <BoxFancy
        borderRadius="full"
        borderGradientColor={borderGradientColor}
        className={buttonClassName}
      >
        {icon || (iconName && <Icon name={iconName} className={iconClasses} />)}
        <span>{children}</span>
      </BoxFancy>
    </Component>
  );
};

export const Button = forwardRef(InteralButton);
