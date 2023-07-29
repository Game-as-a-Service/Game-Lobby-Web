import { useState } from "react";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import Cover from "@/components/shared/Cover";
import IconProfile from "@/public/images/icon_profile.svg";
import UserInfoModal from "../lobby/UserInfoModal";
import Button from "./Button";
import Badge from "./Badge";

enum HeaderActions {
  HELP = "HELP",
  REMIND = "REMIND",
  PROFILE = "PROFILE",
}

export default function Header() {
  const { currentUser } = useAuth();
  const { logout } = useUser();

  const [openProfile, setOpenProfile] = useState(false);

  const buttons = [
    {
      Icon: IconProfile,
      type: HeaderActions.PROFILE,
      click: () => {
        setOpenProfile(true);
      },
      active: openProfile,
    },
  ];

  return (
    <header className="__header flex flex-row items-center justify-between p-[10px_15px] bg-dark1E">
      <div className="flex items-center gap-3">
        <Cover
          src="/images/logo.svg"
          alt="Water ball logo"
          className="w-[39px] h-[39px] bg-transparent"
        />
      </div>
      <div className="header___actions flex gap-6">
        {buttons.map((ButtonProps) => (
          <Badge
            dot
            key={ButtonProps.type}
            placement="top-right"
            count={ButtonProps.type !== HeaderActions.HELP ? 1 : 0}
            size="xLarge"
            className={cn("top-1 right-1", {
              "right-2": ButtonProps.type === HeaderActions.REMIND,
            })}
          >
            <Button
              className="relative bg-transparent hover:shadow-none p-0"
              onClick={ButtonProps.click}
            >
              <ButtonProps.Icon
                className={cn({ "fill-blue": ButtonProps.active })}
              />
            </Button>
          </Badge>
        ))}
        {currentUser && <Button onClick={logout}>登出</Button>}
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
