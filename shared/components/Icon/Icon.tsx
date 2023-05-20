import React from "react";
import { IconVariants } from "./types/types";

export interface IconProps extends React.ComponentPropsWithRef<"i"> {
  className?: string;
  color?: string;
  icon: IconVariants;
  spin?: boolean;
}
export default function Icon(props: IconProps) {
  const {
    className,
    color = "primary",
    icon,
    spin = false,
    style,
    ...rest
  } = props;
  const { definition } = icon;
  return (
    <i
      style={style}
      aria-hidden
      className={`${spin ? "animate-spin" : ""} ${color ? color : ""} ${className ? className : ""}`}
      data-icon-name={icon.name}
      {...rest}
    >
      <svg {...definition.svg} focusable={false}>
        <path {...definition.path} />
      </svg>
    </i>
  );
}
