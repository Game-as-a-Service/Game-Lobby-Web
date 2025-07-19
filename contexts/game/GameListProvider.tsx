import { getAllGamesEndpoint, type GameType } from "@/requests/games";
import { PropsWithChildren, useEffect, useState } from "react";
import useRequest from "@/hooks/useRequest";
import GameListContext from "./GameListContext";

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

export default GameListProvider;
