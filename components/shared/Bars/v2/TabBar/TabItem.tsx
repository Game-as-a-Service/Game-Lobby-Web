import { cn } from "@/lib/utils";

type Props = {
  text: string;
  active: boolean;
  onTabClick: (text: string) => void;
};

const TabItem = ({ text, active, onTabClick }: Readonly<Props>) => {
  const baseClass = "h-12 p-2.5 ";
  const normalClass = "border-b border-violet-950 text-zinc-400";
  const activeClass = "border-b-[3px] border-gradient-purple text-violet-200";
  const tabClass = active
    ? cn(baseClass, activeClass)
    : cn(baseClass, normalClass);
  const clickButton = () => onTabClick(text);

  return (
    <button className={tabClass} onClick={clickButton}>
      <div>{text}</div>
    </button>
  );
};

export default TabItem;
