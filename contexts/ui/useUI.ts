import { useContext } from "react";
import UIContext from "./UIContext";

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within UIProvider");
  }
  return context;
};

export default useUI;
