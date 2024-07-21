import Link from "next/link";
import { useRouter } from "next/router";

import type { IconNameV2 } from "@/components/shared/Icon/v2/icons";
import Icon from "@/components/shared/Icon/v2";
import Button from "@/components/shared/Button";
import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { cn } from "@/lib/utils";

enum SidebarRoutes {
  HOME = "/",
  ROOMS = "/rooms",
}

interface ButtonProps {
  text: string;
  iconName: IconNameV2;
  route: SidebarRoutes;
}

export default function Sidebar() {
  const { pathname } = useRouter();
  const { currentUser } = useAuth();
  const { logout } = useUser();

  const buttons: ButtonProps[] = [
    { text: "遊戲大廳", iconName: "home", route: SidebarRoutes.HOME },
    { text: "遊戲房間", iconName: "arcade", route: SidebarRoutes.ROOMS },
  ];

  return (
    <nav className="flex flex-col shrink-0 justify-start bg-white/8 glass-shadow my-6 ms-1.5 py-6 rounded-2xl w-18 gap-5">
      {buttons.map((ButtonProps) => (
        <Link
          href={ButtonProps.route}
          key={ButtonProps.text}
          className="flex justify-center items-center"
        >
          <Button
            className={cn("bg-transparent p-3 rounded-full hover:shadow-none", {
              "bg-primary-200/20": pathname === ButtonProps.route,
            })}
          >
            <Icon
              name={ButtonProps.iconName}
              className={cn("w-6 h-6 stroke-primary-400", {
                "stroke-primary-200": pathname === ButtonProps.route,
              })}
            />
          </Button>
        </Link>
      ))}
      {currentUser && (
        <Button
          className="mt-auto bg-transparent px-0 justify-center opacity-[0.3] hover:shadow-none hover:opacity-100"
          onClick={logout}
        >
          <Icon className="stroke-primary-400" name="logOut" />
          <span className="text-xs">登出</span>
        </Button>
      )}
    </nav>
  );
}
