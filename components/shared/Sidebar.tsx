import Link from "next/link";
import { useRouter } from "next/router";

import Button from "./Button";
import HomeIcon from "./Icon/group/home";
import RoomsIcon from "./Icon/group/rooms";

import { cn } from "@/lib/utils";

enum SidebarRoutes {
  HOME = "/",
  ROOMS = "/rooms",
}

export default function Sidebar() {
  const router = useRouter();
  const { pathname } = router;

  const buttons = [
    { text: "遊戲大廳", Icon: HomeIcon, route: SidebarRoutes.HOME },
    { text: "遊戲房間", Icon: RoomsIcon, route: SidebarRoutes.ROOMS },
  ];

  return (
    <nav className="__sidebar flex flex-col shrink-0 justify-start bg-dark29 rounded-[10px] w-[71px] gap-5">
      {buttons.map((ButtonProps) => (
        <Link
          href={ButtonProps.route}
          key={ButtonProps.text}
          className="block flex justify-center items-center"
        >
          <Button
            className={cn(
              "bg-transparent px-0 justify-center opacity-[0.3] hover:shadow-none hover:opacity-100",
              {
                "opacity-1": pathname === ButtonProps.route,
              }
            )}
          >
            <div className="w-full flex flex-col items-center gap-1">
              <ButtonProps.Icon active={pathname === ButtonProps.route} />
              <span className={cn("text-xs")}>{ButtonProps.text}</span>
            </div>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
