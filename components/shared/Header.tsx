import { useState } from "react";
import IconV2, { IconName } from "@/components/shared/Icon";
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
  iconName: IconName;
  isActive: boolean;
  onClick: () => void;
}

interface HeaderProps {
  className?: string;
  onClickChatButton: () => void;
}

export default function Header({
  className,
  onClickChatButton,
}: Readonly<HeaderProps>) {
  const [openProfile, setOpenProfile] = useState(false);

  const buttons: ButtonProps[] = [
    {
      iconName: "Chat",
      type: HeaderActions.CHAT,
      isActive: false,
      onClick: onClickChatButton,
    },
    {
      iconName: "Notification",
      type: HeaderActions.NOTIFICATION,
      isActive: false,
      onClick: () => {},
    },
    {
      iconName: "Player",
      type: HeaderActions.PROFILE,
      isActive: openProfile,
      onClick: () => {
        setOpenProfile(true);
      },
    },
  ];

  return (
    <header
      className={cn(
        "flex items-center justify-between px-8 py-2 bg-white/8 glass-shadow backdrop-blur-3xl",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <IconV2 name="Logo" className="w-10 h-10" />
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
