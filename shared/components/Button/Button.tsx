import {
  ComponentProps,
  ElementType,
  ForwardedRef,
  ReactNode,
  SyntheticEvent,
  forwardRef,
} from "react";

/**
 * 為了實現 forwardRef 泛型推斷特性
 * @see https://fettblog.eu/typescript-react-generic-forward-refs/#option-3%3A-augment-forwardref
 */
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export const buttonVariants = {
  primary: "bg-indigo-500 outline-indigo-500/60 focus:outline-8 hover:bg-indigo-500/90 text-white",
  secondary: "bg-green-500 outline-green-500/60 focus:outline-8 hover:bg-green-500/90 text-white",
  danger: "bg-red-500 outline-red-500/60 focus:outline-8 hover:bg-red-500/90 text-white",
} as const;

export const roundedVariants = {
  default: "rounded-lg",
  none: "rounded-none",
  pill: "rounded-full",
  bottom: "rounded-b-lg",
} as const;

export const sizeVariants = {
  small: "px-3 py-1 text-sm",
  medium: "px-5 py-1.5 text-base",
  large: "px-6 py-2 text-xl",
} as const;

export interface BaseButtonProps<C extends ElementType = "button"> {
  /** Button root node component @default button */
  component?: C | "button";
  /** Button variant @default primary */
  variant?: keyof typeof buttonVariants;
  /** Button shape @default default */
  rounded?: keyof typeof roundedVariants;
  /** Button size @default medium */
  size?: keyof typeof sizeVariants;
  /** If `true`, the component is disabled */
  disabled?: boolean;
  /** If `true`, the component is active */
  active?: boolean;
  /** If `true`, the component is loading */
  loading?: boolean;
  /** Can be replcaed loading component @default LoadingIcon */
  loadingComponent?: ReactNode;
  /** Button prefix icon */
  prefix?: ReactNode;
  /** Button suffix icon */
  suffix?: ReactNode;
  /** The content of the component */
  children?: ReactNode;
  className?: string;
  onClick?: (e: SyntheticEvent) => void;
}

export type ButtonProps<C extends ElementType = "button"> = BaseButtonProps<C> &
  Omit<ComponentProps<C>, keyof BaseButtonProps<C>>;

const cx = (...args: unknown[]) => args.filter(Boolean).join(" ");

const InteralButton = <C extends ElementType = "button">(
  props: ButtonProps<C>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  const {
    component: Component = "button",
    variant = "primary",
    rounded = "default",
    size = "medium",
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
  } = props;

  const showLoading = loading && !prefix && !suffix;

  const handleClick = (event: SyntheticEvent) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClick?.(event);
  };

  const prefixIcon = prefix && (
    <ButtonIcon
      loading={loading}
      loadingComponent={loadingComponent}
      className="mr-1"
    >
      {prefix}
    </ButtonIcon>
  );

  const suffixIcon = suffix && (
    <ButtonIcon
      loading={loading}
      loadingComponent={loadingComponent}
      className="ml-1"
    >
      {suffix}
    </ButtonIcon>
  );

  return (
    <Component
      ref={ref}
      role="button"
      className={cx(
        "relative flex justify-center items-center transition-[opacity,filter,transform] active:scale-95",
        buttonVariants[variant],
        roundedVariants[rounded],
        sizeVariants[size],
        (disabled || loading) && "opacity-60 pointer-events-none select-none",
        active && "is-active scale-95 hue-rotate-30",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      {...attributes}
    >
      {prefixIcon}
      <span className={showLoading ? "opacity-0" : ""}>{children}</span>
      {showLoading && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {loadingComponent}
        </span>
      )}
      {suffixIcon}
    </Component>
  );
};

//#region 暫時用，等 Icon component
interface ButtonIconProps {
  loading?: boolean;
  loadingComponent: ReactNode;
  children: ReactNode;
  className: string;
}

const ButtonIcon = ({
  loading,
  loadingComponent,
  children,
  className,
}: ButtonIconProps) => {
  return (
    <span className={className}>{loading ? loadingComponent : children}</span>
  );
};

const LoadingIcon = () => <div className="border-2 border-t-white/30 w-4 h-4 rounded-full animate-spin"></div>
//#endregion

export const Button = forwardRef(InteralButton);

export default Button;
