import { PropsWithChildren } from "react";
import { useGames } from "@/features/game";
import GameListContext from "./GameListContext";

function GameListProvider({ children }: PropsWithChildren) {
  // 使用簡化的 API hook
  const { data: gameList } = useGames();

  return (
    <GameListContext.Provider value={gameList}>
      {children}
    </GameListContext.Provider>
  );
}

export default GameListProvider;
