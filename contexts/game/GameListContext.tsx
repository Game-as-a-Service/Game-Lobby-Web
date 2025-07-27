import { type Game } from "@/api";
import { createContext } from "react";

const GameListContext = createContext<Game[]>([]);

export default GameListContext;
