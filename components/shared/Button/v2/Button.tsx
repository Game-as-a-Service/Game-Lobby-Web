import type { ClassValue } from "clsx";
import {
  ComponentProps,
  ElementType,
  FC,
  ForwardedRef,
  ReactNode,
  SyntheticEvent,
  forwardRef,
  useCallback,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import BoxFancy, { BoxFancyBorderGradientVariant } from "../../BoxFancy";
import { IconName } from "../../Icon/icons";
import Icon from "../../Icon";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  HIGHLIGHT = "highlight",
}

export enum ButtonSize {
  REGULAR = "regular",
  SMALL = "small",
}

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
  iconName?: IconName;
  disabled?: boolean;
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

const iconTypeClasses: Record<ButtonType, string> = {
  primary:
    "stroke-primary-700 hover:stroke-primary-50 active:stroke-primary-50",
  secondary: "stroke-primary-200",
  highlight: "stroke-primary-50",
};

const InteralButton = (
  {
    type = ButtonType.PRIMARY,
    size = ButtonSize.REGULAR,
    icon,
    iconName,
    children,
    className,
    disabled,
    onClick,
    ...otherButtonAttributes
  }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
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

  const buttonClassName = useMemo(
    () =>
      cn(
        "w-auto items-center fz-16-b transition-colors transition-[border-image] ease-in",
        "disabled:text-grey-200 disabled:bg-grey-800",
        buttonTypeClasses[type],
        buttonSizeClasses[size],
        className
      ),
    [className, size, type]
  );

  const iconClassName = useMemo(
    () => cn("w-6 h-6", iconTypeClasses[type], className),
    [className, type]
  );

  const borderGradientColor: BoxFancyBorderGradientVariant =
    type === ButtonType.SECONDARY && !disabled ? "purple" : "none";

  return (
    <BoxFancy
      component="button"
      ref={ref}
      role="button"
      borderRadius="full"
      borderGradientColor={borderGradientColor}
      className={buttonClassName}
      disabled={disabled}
      onClick={handleClick}
      {...otherButtonAttributes}
    >
      {icon || (iconName && <Icon name={iconName} className={iconClassName} />)}
      <span>{children}</span>
    </BoxFancy>
  );
};

export const Button = forwardRef(InteralButton);
