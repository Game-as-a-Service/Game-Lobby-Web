import GamePickModal from "./GamePickModal";

export default GamePickModal;

export type GameType = {
  id: string;
  displayName: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  category?: string;
};
