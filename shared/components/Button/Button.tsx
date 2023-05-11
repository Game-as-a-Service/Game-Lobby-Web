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
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
}

export interface BaseButtonProps<C extends ElementType = "button"> {
  /** Button root node component @default button */
  component?: C | "button";

  /** Button variant @default primary */
  variant?: keyof typeof ButtonVariant | ButtonVariant;

  /** If `true`, the button will be in disabled mode */
  disabled?: boolean;

  /** If `true`, the button will be in active mode */
  active?: boolean;

  /** If `true`, the button will be in loading mode  */
  loading?: boolean;

  /** Can be replcaed loading component @default LoadingIcon */
  loadingComponent?: ReactNode;

  /** Button prefix icon */
  prefix?: ReactNode;

  /** Button suffix icon */
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
      "bg-indigo-500 outline-indigo-500/60 hover:shadow-indigo-500/40 active:bg-indigo-500/80",
    primary_active: "bg-indigo-500/80 shadow-indigo-500/40 hover:bg-indigo-500",
    secondary:
      "bg-green-500 outline-green-500/60 hover:shadow-green-500/40 active:bg-green-500/80",
    secondary_active: "bg-green-500/80 shadow-green-500/40 hover:bg-green-500",
    danger:
      "bg-red-500 outline-red-500/60 hover:shadow-red-500/40 active:bg-red-500/80",
    danger_active: "bg-red-500/80 shadow-red-500/40 hover:bg-red-500",
  };

  const buttonClassName = cn(
    "relative px-4 py-1.5 flex items-center gap-1.5 rounded-lg shadow-lg text-white/90 focus:outline-8 transition-[box-shadow,background] ease-in",
    buttonVariants[variant],
    (disabled || loading) && "opacity-60 pointer-events-none select-none",
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
