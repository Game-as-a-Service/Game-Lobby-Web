import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import icons, { IconNameV2 } from "./icons";
import { HTMLProps } from "react";

type IconProps = {
  name: IconNameV2;
  className?: ClassValue;
};

/**
 * 新增 Svg 可以將檔案放至 `@/components/shared/Icon/v2/icons/svgs` 裡，
 * 在 `@/components/shared/Icon/v2/icons/index.ts` 引入 svg
 * 並放入 **icons** 這個物件，即可使用
 */
const Icon = (props: IconProps) => {
  const { className, name, ...rest } = props;
  const transformClassName = cn("stroke-basic-black", className);
  const SvgIcon: React.FC<HTMLProps<"svg">> = name && icons[name];

  return <SvgIcon className={transformClassName} aria-hidden {...rest} />;
};

export default Icon;
