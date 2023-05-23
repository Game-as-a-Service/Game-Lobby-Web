import CategoryTitle from "./CategoryTitle";
import PickGameItem from "./GameItem";
import type { GameType } from ".";

export interface GameListProp {
  activeGameId: string;
  gameList: GameType[];
  onGameChange: (gameId: string) => void;
}

export type GroupedGamesType = {
  [category: string]: GameType[];
};

function GameList({ gameList, onGameChange, activeGameId }: GameListProp) {
  const groupedGames = gameList.reduce((result: GroupedGamesType, game) => {
    const category = game.category || "其他";
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(game);
    return result;
  }, {});

  return (
    <>
      {Object.entries(groupedGames).map(([category, games]) => (
        <div key={category} className="pt-[50px] first-of-type:pt-0">
          <CategoryTitle title={category} />
          <ul className="grid grid-cols-4 gap-x-[14px] gap-y-[15px] mt-[14.5px]">
            {games.map((game) => (
              <PickGameItem
                key={game.id}
                checked={activeGameId === game.id}
                game={game}
                onChange={() => onGameChange(game.id)}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default GameList;
