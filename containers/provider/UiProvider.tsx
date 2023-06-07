import { FC, ReactNode, useEffect, useState } from "react";
import UiContext from "@/contexts/UiContext";
import Chat from "@/components/shared/Chat";
import UserInfoModal from "@/components/lobby/UserInfoModal";

type Props = {
  children: React.ReactNode;
};

const UiProvider: FC<Props> = ({ children }) => {
  const [openHelp, setOpenHelp] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [openRemind, setOpenRemind] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <UiContext.Provider
      value={{
        openHelp,
        setOpenHelp,
        openChat,
        toggleChat: () => {
          setOpenChat((status) => !status);
        },
        openRemind,
        setOpenRemind,
        openProfile,
        setOpenProfile,
      }}
    >
      {children}
      {openProfile && (
        <UserInfoModal
          isOpen={openProfile}
          onClose={() => setOpenProfile(false)}
        />
      )}
      <Chat />
    </UiContext.Provider>
  );
};

export default UiProvider;
