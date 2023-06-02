import { createContext } from "react";
import { GameType } from "@/requests/games";

export type CreateRoomFormType = {
  name: string;
  gameId: string;
  password: null | number;
  minPlayers: number;
  maxPlayers: number;
};

interface ICreateRoomContext {
  currentGame: GameType | undefined;
  roomForm: CreateRoomFormType;
  updateGame: (game: GameType) => void;
  updateRoomName: (name: string) => void;
  updateMaxplayers: (maxPlayers: number) => void;
  updatePassword: (password: CreateRoomFormType["password"]) => void;
}

export const initCreateRoomForm: CreateRoomFormType = {
  name: "",
  gameId: "",
  password: null,
  minPlayers: 3,
  maxPlayers: 6,
};

const CreateRoomContext = createContext<ICreateRoomContext>({
  currentGame: undefined,
  roomForm: initCreateRoomForm,
  updateGame: () => {},
  updateRoomName: () => {},
  updateMaxplayers: () => {},
  updatePassword: () => {},
});

export default CreateRoomContext;
