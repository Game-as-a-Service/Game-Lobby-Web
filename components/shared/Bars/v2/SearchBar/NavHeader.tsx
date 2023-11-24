import Icon from "@/components/shared/Icon";
import { IconName } from "@/components/shared/Icon/icons";

type Props = {
  svg: IconName;
  text: string;
};

const NavHeader = ({ svg, text }: Readonly<Props>) => {
  return (
    <div className="self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex">
      <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
        <Icon name={svg} className="w-6 h-6 stroke-white"></Icon>
        <div className="grow shrink basis-0 text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
          {text}
        </div>
      </div>
    </div>
  );
};

export default NavHeader;
