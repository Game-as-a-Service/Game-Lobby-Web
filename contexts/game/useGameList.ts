import { useContext } from "react";
import GameListContext from "./GameListContext";

export const useGameList = () => {
  const result = useContext(GameListContext);
  if (!result) {
    throw new Error("useGameList must be used within a GameListProvider");
  }
  return result;
};

export default useGameList;
