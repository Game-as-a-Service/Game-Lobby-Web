import { useContext, useEffect, useState } from "react";
import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import Cover from "@/components/shared/Cover";
import IconProfile from "@/public/images/icon_profile.svg";
import IconMessage from "@/public/images/icon_message.svg";
import IconHelp from "@/public/images/icon_help.svg";
import IconRemind from "@/public/images/icon_remind.svg";
import SearchBar from "./SearchBar";
import Button from "./Button";
import { cn } from "@/lib/utils";
import Badge from "./Badge";
import UiContext from "@/contexts/UiContext";

enum HeaderActions {
  HELP = "HELP",
  CHAT = "CHAT",
  REMIND = "REMIND",
  PROFILE = "PROFILE",
}

export default function Header() {
  const [value, setValue] = useState("");
  const { currentUser } = useAuth();
  const { logout } = useUser();
  const {
    toggleChat,
    setOpenProfile,
    setOpenHelp,
    setOpenRemind,
    openChat,
    openHelp,
    openProfile,
    openRemind,
  } = useContext(UiContext);

  const buttons = [
    {
      Icon: IconHelp,
      type: HeaderActions.HELP,
      click: () => {
        setOpenHelp(true);
      },
      active: openHelp,
    },
    {
      Icon: IconMessage,
      type: HeaderActions.CHAT,
      click: () => {
        toggleChat();
      },
      active: openChat,
    },
    {
      Icon: IconRemind,
      type: HeaderActions.REMIND,
      click: () => {
        setOpenRemind(true);
      },
      active: openRemind,
    },
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
    <header className="flex flex-row items-center justify-between p-[10px_15px]">
      <div className="flex items-center gap-3">
        <Cover
          src="/images/logo.svg"
          alt="Water ball logo"
          className="w-[39px] h-[39px] bg-transparent"
        />
        <h1 className="text-white">遊戲線上揪</h1>
      </div>
      <SearchBar value={value} onChange={setValue} />
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
    </header>
  );
}
