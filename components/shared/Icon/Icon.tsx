import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import icons, { IconName } from "./icons";

type IconProps = {
  name: IconName;
  className?: ClassValue;
};

/**
 * 新增 Svg 可以將檔案放至 `@/components/shared/Icon/icons/svgs` 裡，
 * 在 `@/components/shared/Icon/icons/index.ts` 引入 svg
 * 並放入 **icons** 這個物件，即可使用
 */
const Icon = (props: IconProps) => {
  const { className, name, ...rest } = props;
  const transformClassName = cn("stroke-primary-100", className);
  const SvgIcon = name && icons[name];

  return (
    <SvgIcon
      focusable={false}
      className={transformClassName}
      aria-hidden
      {...rest}
    />
  );
};

export default Icon;
