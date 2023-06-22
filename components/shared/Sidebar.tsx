import { useState } from "react";
import Button from "./Button";
import HomeIcon from "./Icon/group/home";
import NewsIcon from "./Icon/group/news";
import RoomsIcon from "./Icon/group/rooms";
import { cn } from "@/lib/utils";

enum SidebarActive {
  NEWS = "news",
  HOME = "home",
  ROOMS = "rooms",
}

export default function Sidebar() {
  const [selected, setSelected] = useState(SidebarActive.NEWS);

  const buttons = [
    { text: "公告", Icon: NewsIcon, type: SidebarActive.NEWS },
    { text: "遊戲大廳", Icon: HomeIcon, type: SidebarActive.HOME },
    { text: "遊戲房間", Icon: RoomsIcon, type: SidebarActive.ROOMS },
  ];

  return (
    <nav className="flex flex-col shrink-0 justify-start bg-dark29 rounded-[10px] w-[71px] gap-5">
      {buttons.map((ButtonProps) => (
        <Button
          key={ButtonProps.type}
          className={cn(
            "bg-transparent px-0 justify-center opacity-[0.3] hover:shadow-none hover:opacity-100",
            {
              "opacity-1": selected === ButtonProps.type,
            }
          )}
          onClick={() => setSelected(ButtonProps.type)}
        >
          <div className="w-full flex flex-col items-center gap-1">
            <ButtonProps.Icon active={selected === ButtonProps.type} />
            <span className={cn("text-xs")}>{ButtonProps.text}</span>
          </div>
        </Button>
      ))}
    </nav>
  );
}
