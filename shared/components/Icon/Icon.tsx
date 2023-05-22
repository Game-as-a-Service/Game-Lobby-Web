import React from "react";
import { IconVariants } from "./types/types";
import {cn} from '@/lib/utils';

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
  const transformClassName = cn(className)
  return (
    <i
      style={style}
      aria-hidden
      className={transformClassName}
      data-icon-name={icon.name}
      {...rest}
    >
      <svg {...definition.svg} focusable={false}>
        <path {...definition.path} />
      </svg>
    </i>
  );
}
