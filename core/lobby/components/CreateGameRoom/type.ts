interface Game {
  id: string;
  name: string;
}

interface User {
  id: string;
  nickname: string;
}

export type GameType = {
  id: string;
  displayName: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  category?: string;
};

export interface CreateRoomResponseType {
  id: string;
  name: string;
  game: Game;
  host: User;
  isLocked: boolean;
  currentPlayers: number;
  minPlayers: number;
  maxPlayers: number;
}
