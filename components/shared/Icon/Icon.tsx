import * as icons from "./icons";
import type { IconName } from "./icons";

type IconProps = {
  name: IconName;
  className?: string;
};

const Icon = ({ name, className }: IconProps) => {
  const GenerateIcon = icons[name];

  return <GenerateIcon className={className} aria-hidden />;
};

export default Icon;
