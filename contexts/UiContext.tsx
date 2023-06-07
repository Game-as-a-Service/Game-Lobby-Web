import { createContext } from "react";

interface UiContextProps {
  openHelp: boolean;
  setOpenHelp: (status: boolean) => void;
  openChat: boolean;
  toggleChat: () => void;
  openRemind: boolean;
  setOpenRemind: (status: boolean) => void;
  openProfile: boolean;
  setOpenProfile: (status: boolean) => void;
}

const UiContext = createContext<UiContextProps>({
  openHelp: false,
  setOpenHelp: (status: boolean) => null,
  openChat: false,
  toggleChat: () => null,
  openRemind: false,
  setOpenRemind: (status: boolean) => null,
  openProfile: false,
  setOpenProfile: (status: boolean) => null,
});

export default UiContext;
