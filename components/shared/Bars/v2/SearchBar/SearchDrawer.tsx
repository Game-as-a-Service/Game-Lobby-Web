import { cn } from "@/lib/utils";
import NavHeader from "@/components/shared/Bars/v2/SearchBar/NavHeader";
import NavItem from "@/components/shared/Bars/v2/SearchBar/NavItem";

type Props = {
  className?: string;
  category: {
    action: string[];
    adventure: string[];
    simulation: string[];
    strategy: string[];
  };
};

const SearchDrawer = ({ className, category }: Readonly<Props>) => {
  return (
    <div
      className={cn(
        "w-[484px] pb-2 bg-zinc-950 bg-opacity-40 rounded-2xl shadow border border-slate-500 backdrop-blur-[104.20px] flex-col justify-start items-center inline-flex",
        className
      )}
    >
      <div className="w-[484px] p-3 rounded-2xl justify-start items-center gap-4 inline-flex bg-opacity-4">
        <div className="w-[220px] flex-col justify-start items-start inline-flex">
          <NavHeader svg="archery" text="動作"></NavHeader>
          {category.action.map((text, index) => {
            return <NavItem key={index} text={text}></NavItem>;
          })}
          <div className="self-stretch h-px px-4 flex-col justify-center items-start flex">
            <div className="self-stretch h-[0px] border border-slate-500"></div>
          </div>
          <NavHeader svg="explore" text="冒險"></NavHeader>
          {category.adventure.map((text, index) => {
            return <NavItem key={index} text={text}></NavItem>;
          })}
        </div>
        <div className="w-[220px] flex-col justify-start items-start inline-flex">
          <NavHeader svg="hotAirBalloon" text="模擬"></NavHeader>
          {category.simulation.map((text, index) => {
            return <NavItem key={index} text={text}></NavItem>;
          })}
          <div className="self-stretch h-px px-4 flex-col justify-center items-start flex">
            <div className="self-stretch h-[0px] border border-slate-500"></div>
          </div>
          <NavHeader svg="chessRook" text="策略"></NavHeader>
          {category.strategy.map((text, index) => {
            return <NavItem key={index} text={text}></NavItem>;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
