import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

import Button from "./Button";
import Icon from "@/components/shared/Icon";
import type { IconName } from "./Icon/icons";

enum SidebarRoutes {
  HOME = "/",
  ROOMS = "/rooms",
}

export default function Sidebar() {
  const router = useRouter();
  const { pathname } = router;

  const buttons: {
    text: string;
    iconName: IconName;
    route: SidebarRoutes;
  }[] = [
    { text: "遊戲大廳", iconName: "home", route: SidebarRoutes.HOME },
    { text: "遊戲房間", iconName: "arcade", route: SidebarRoutes.ROOMS },
  ];

  return (
    <nav className="flex flex-col shrink-0 justify-start bg-dark29 rounded-[10px] w-[71px] gap-5">
      {buttons.map((ButtonProps) => (
        <Link
          href={ButtonProps.route}
          key={ButtonProps.text}
          className="flex justify-center items-center"
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
              <Icon
                name={ButtonProps.iconName}
                className={{
                  "[&_*]:stroke-[#2F88FF]": pathname === ButtonProps.route,
                }}
              />
              <span className={cn("text-xs")}>{ButtonProps.text}</span>
            </div>
          </Button>
        </Link>
      ))}
    </nav>
  );
}
