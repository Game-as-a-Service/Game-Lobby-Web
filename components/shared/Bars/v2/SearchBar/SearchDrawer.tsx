import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import NavItem from "@/components/shared/Bars/v2/SearchBar/NavItem";
import Icon from "@/components/shared/Icon";

type Props = {
  className?: string;
};

const SearchDrawer = ({ className }: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn(
        "w-[484px] h-[537px] pb-2 bg-zinc-950 bg-opacity-40 rounded-2xl shadow border border-slate-500 backdrop-blur-[104.20px] flex-col justify-start items-center inline-flex",
        className
      )}
    >
      <div className="w-[484px] p-3 rounded-2xl justify-start items-center gap-4 inline-flex">
        <div className="w-[220px] flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
              <Icon name="archery" className="w-6 h-6 stroke-white"></Icon>
              <div className="grow shrink basis-0 text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
                動作
              </div>
            </div>
          </div>
          <NavItem text="格鬥和武術"></NavItem>
          <NavItem text="第一人稱射擊"></NavItem>
          <NavItem text="第三人稱射擊"></NavItem>
          <NavItem text="街機和節奏"></NavItem>
          <div className="self-stretch h-px px-4 flex-col justify-center items-start flex">
            <div className="self-stretch h-[0px] border border-slate-500"></div>
          </div>
          <div className="self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
              <Icon name="explore" className="w-6 h-6 stroke-white"></Icon>
              <div className="grow shrink basis-0 text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
                冒險
              </div>
            </div>
          </div>
          <NavItem text="休閒"></NavItem>
          <NavItem text="劇情豐富"></NavItem>
          <NavItem text="視覺小說"></NavItem>
        </div>
        <div className="w-[220px] flex-col justify-start items-start inline-flex">
          <div className="self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
              <Icon
                name="hotAirBalloon"
                className="w-6 h-6 stroke-white"
              ></Icon>
              <div className="grow shrink basis-0 text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
                模擬
              </div>
            </div>
          </div>
          <NavItem text="太空和飛行"></NavItem>
          <NavItem text="建造和自動化"></NavItem>
          <NavItem text="戀愛"></NavItem>
          <NavItem text="沙盒和物理"></NavItem>
          <div className="self-stretch h-px px-4 flex-col justify-center items-start flex">
            <div className="self-stretch h-[0px] border border-slate-500"></div>
          </div>
          <div className="self-stretch h-14 rounded-[100px] justify-start items-center gap-3 inline-flex">
            <div className="grow shrink basis-0 self-stretch px-6 py-4 justify-start items-center gap-3 flex">
              <Icon name="chessRook" className="w-6 h-6 stroke-white"></Icon>
              <div className="grow shrink basis-0 text-violet-200 text-sm font-medium font-['Noto Sans TC'] leading-[21px]">
                策略
              </div>
            </div>
          </div>
          <NavItem text="卡牌和棋盤"></NavItem>
          <NavItem text="即時策略"></NavItem>
          <NavItem text="回合制策略"></NavItem>
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
