import { createContext } from "react";
import { GameType } from "@/core/lobby/components/CreateGameRoom/type";

export type CreateRoomFormType = {
  name: string;
  gameId: string;
  password: null | number;
  minPlayers: number;
  maxPlayers: number;
};

interface ICreateGameRoomContext {
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

const CreateGameRoomContext = createContext<ICreateGameRoomContext>({
  currentGame: undefined,
  roomForm: initCreateRoomForm,
  updateGame: () => {},
  updateRoomName: () => {},
  updateMaxplayers: () => {},
  updatePassword: () => {},
});

export default CreateGameRoomContext;
