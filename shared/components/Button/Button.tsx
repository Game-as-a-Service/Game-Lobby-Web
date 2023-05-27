import type { ClassValue } from "clsx";
import {
  ComponentProps,
  ElementType,
  ForwardedRef,
  ReactNode,
  SyntheticEvent,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

/**
 * 為了實現 forwardRef 泛型推斷特性
 * @see https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
 */
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  DARK = "dark",
}

export interface BaseButtonProps<C extends ElementType = "button"> {
  /** Button root node component @default button */
  component?: C | "button";

  /** Button variant @default primary */
  variant?: Lowercase<keyof typeof ButtonVariant> | ButtonVariant;

  /** If `true`, the button will be in disabled mode */
  disabled?: boolean;

  /** If `true`, the button will be in active mode */
  active?: boolean;

  /** If `true`, the button will be in loading mode  */
  loading?: boolean;

  /** Can be replcaed loading component @default LoadingIcon */
  loadingComponent?: ReactNode;

  /** Button prefix */
  prefix?: ReactNode;

  /** Button suffix */
  suffix?: ReactNode;

  /** The content of the component */
  children?: ReactNode;

  /** For button class name */
  className?: ClassValue;

  /**
   * Callback function that is called when the button is clicked.
   * @param event - The event object associated with the click event.
   */
  onClick?: (event: SyntheticEvent) => void;
}

export type ButtonProps<C extends ElementType = "button"> = BaseButtonProps<C> &
  Omit<ComponentProps<C>, keyof BaseButtonProps<C>>;

const InteralButton = <C extends ElementType = "button">(
  {
    component: Component = "button",
    variant = "primary",
    disabled,
    active,
    loading,
    loadingComponent = <LoadingIcon />,
    prefix,
    suffix,
    children,
    className,
    onClick,
    ...attributes
  }: ButtonProps<C>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const showLoading = loading && !prefix && !suffix;

  const handleClick = (event: SyntheticEvent) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const buttonVariants: Record<
    ButtonVariant | `${ButtonVariant}_active`,
    string
  > = {
    primary:
      "bg-[#2F88FF] outline-[#2F88FF]/60 hover:shadow-[#2F88FF]/40 active:bg-[#2173DD]",
    primary_active: "bg-[#2173DD] hover:bg-[#2173DD]",
    secondary:
      "bg-[#23A55A] outline-[#23A55A]/60 hover:shadow-[#23A55A]/40 active:bg-[#1D8C4C]",
    secondary_active: "bg-[#1D8C4C] hover:bg-[#1D8C4C]",
    danger:
      "bg-[#CC2431] outline-[#CC2431]/60 hover:shadow-[#CC2431]/40 active:bg-[#B01C29]",
    danger_active: "bg-[#B01C29] hover:bg-[#B01C29]",
    dark: "bg-[#2D2D2E] outline-[#2D2D2E]/60 hover:shadow-[#2D2D2E]/40 active:bg-[#1F1F20]",
    dark_active: "bg-[#1F1F20] hover:bg-[#1F1F20]",
  };

  const buttonClassName = cn(
    "relative px-4 py-1.5 inline-flex items-center gap-1.5 rounded-lg shadow-md text-white/90 focus:outline-8 transition-[box-shadow,background,opacity] ease-in",
    buttonVariants[variant],
    (disabled || loading) &&
      "opacity-70 pointer-events-none select-none text-gray-200",
    active && buttonVariants[`${variant}_active`],
    className
  );

  return (
    <Component
      ref={ref}
      role="button"
      className={buttonClassName}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...attributes}
    >
      {prefix && <>{loading ? loadingComponent : prefix}</>}
      <span className={showLoading ? "opacity-0" : ""}>{children}</span>
      {showLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {loadingComponent}
        </span>
      )}
      {suffix && <>{loading ? loadingComponent : suffix}</>}
    </Component>
  );
};

const LoadingIcon = () => (
  <div className="border-2 border-t-white/30 w-4 h-4 rounded-full animate-spin"></div>
);

export const Button = forwardRef(InteralButton);

export default Button;
