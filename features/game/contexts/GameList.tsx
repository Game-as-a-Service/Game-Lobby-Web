import { getAllGamesEndpoint, type GameType } from "@/requests/games";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import useRequest from "@/hooks/useRequest";

const GameListContext = createContext<GameType[]>([]);

function GameListProvider({ children }: PropsWithChildren) {
  const { fetch } = useRequest();
  const [gameList, setGameList] = useState<GameType[]>([]);

  useEffect(() => {
    fetch(getAllGamesEndpoint()).then(setGameList);
  }, [fetch]);

  return (
    <GameListContext.Provider value={gameList}>
      {children}
    </GameListContext.Provider>
  );
}

export const useGameList = () => {
  const result = useContext(GameListContext);
  if (!result) {
    throw new Error("useGameList must be used within a GameListProvider");
  }
  return result;
};

export default GameListProvider;
