import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import { IconVariants } from "./types/types";
import icons, { IconName } from "./icons";

export type IconProps = {
  className?: ClassValue;

  /** If `true`, spin animation */
  spin?: boolean;
} & (
  | {
      icon: IconVariants;
      name?: never;
    }
  | {
      icon?: never;
      name: IconName;
    }
);

/**
 * 新增 Svg 可以將檔案放至 `@/components/shared/Icon/icons/svgs` 裡，
 * 在 `@/components/shared/Icon/icons/index.ts` 引入 svg
 * 並放入 **icons** 這個物件，即可使用
 */
const Icon = (props: IconProps) => {
  const { className, icon, name, spin = false } = props;
  const definition = icon?.definition;
  const transformClassName = cn(className, { "animate-spin": spin });
  const SvgIcon = name && icons[name];

  return (
    <>
      {SvgIcon && (
        <SvgIcon focusable={false} className={transformClassName} aria-hidden />
      )}
      {definition && (
        <svg
          {...definition.svg}
          focusable={false}
          className={transformClassName}
          aria-hidden
        >
          {definition.path?.map((path, index) => (
            <path key={index} {...path} />
          ))}
        </svg>
      )}
    </>
  );
};

export default Icon;
