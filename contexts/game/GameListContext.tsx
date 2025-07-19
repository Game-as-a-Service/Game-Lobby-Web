import { type GameType } from "@/requests/games";
import { createContext } from "react";

const GameListContext = createContext<GameType[]>([]);

export default GameListContext;
