import { useState } from "react";
import type { IconNameV2 } from "@/components/shared/Icon/v2/icons";
import Icon from "@/components/shared/Icon";
import IconV2 from "@/components/shared/Icon/v2";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import UserInfoModal from "@/components/lobby/UserInfoModal";
import { cn } from "@/lib/utils";

enum HeaderActions {
  CHAT = "CHAT",
  NOTIFICATION = "NOTIFICATION",
  PROFILE = "PROFILE",
}

interface ButtonProps {
  type: HeaderActions;
  iconName: IconNameV2;
  isActive: boolean;
  onClick: () => void;
}

export default function Header() {
  const [openProfile, setOpenProfile] = useState(false);

  const buttons: ButtonProps[] = [
    {
      iconName: "chatDefault",
      type: HeaderActions.CHAT,
      isActive: false,
      onClick: () => {},
    },
    {
      iconName: "notificationDefault",
      type: HeaderActions.NOTIFICATION,
      isActive: false,
      onClick: () => {},
    },
    {
      iconName: "player",
      type: HeaderActions.PROFILE,
      isActive: openProfile,
      onClick: () => {
        setOpenProfile(true);
      },
    },
  ];

  return (
    <header className="flex flex-row items-center justify-between px-8 py-2 bg-white/8 glass-shadow">
      <div className="flex items-center gap-3">
        <Icon name="logo" className="bg-transparent" />
        <h2 className="text-primary-100 text-2xl">遊戲微服務大平台</h2>
      </div>
      <div className="header___actions flex gap-5">
        {buttons.map(({ type, iconName, isActive, onClick }) => (
          <Badge
            dot
            key={type}
            placement="top-right"
            className={cn("top-1 right-1")}
          >
            <Button
              className="relative bg-transparent hover:shadow-none p-2.5"
              onClick={onClick}
            >
              <IconV2
                name={iconName}
                className={cn("w-5 h-5 [&_*]:stroke-white", {
                  "fill-blue": isActive,
                })}
              />
            </Button>
          </Badge>
        ))}
      </div>
      {openProfile && (
        <UserInfoModal
          isOpen={openProfile}
          onClose={() => setOpenProfile(false)}
        />
      )}
    </header>
  );
}
