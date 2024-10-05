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

interface RouteProps {
  text: string;
  iconName: IconNameV2;
  route: `${SidebarRoutes}${string}`;
  isShow: boolean;
}

export default function Sidebar() {
  const { pathname } = useRouter();
  const { currentUser } = useAuth();
  const { logout, getRoomId } = useUser();
  const roomId = getRoomId();

  const routes: RouteProps[] = [
    {
      text: "遊戲大廳",
      iconName: "home",
      route: SidebarRoutes.HOME,
      isShow: true,
    },
    {
      text: "遊戲房間",
      iconName: "arcade",
      route: SidebarRoutes.ROOMS,
      isShow: !roomId,
    },
    {
      text: "遊戲房間",
      iconName: "arcade",
      route: `${SidebarRoutes.ROOMS}/${roomId}`,
      isShow: !!roomId,
    },
  ];

  const isActive = (route: string) => {
    return pathname === route;
  };

  return (
    <nav className="flex flex-col justify-start bg-white/8 glass-shadow py-6 rounded-2xl w-18 h-full gap-5">
      {routes
        .filter((route) => route.isShow)
        .map((routeProps) => (
          <Link
            href={routeProps.route}
            key={routeProps.text}
            title={routeProps.text}
            className="flex justify-center items-center"
          >
            <Button
              className={cn(
                "bg-transparent p-3 rounded-full hover:shadow-none",
                {
                  "bg-primary-200/20": isActive(routeProps.route),
                }
              )}
            >
              <Icon
                name={routeProps.iconName}
                className={cn("w-6 h-6 stroke-primary-400", {
                  "stroke-primary-200": isActive(routeProps.route),
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
