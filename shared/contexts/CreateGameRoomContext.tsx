import { createContext } from "react";

type defaultRoomForm = {
  name: string;
  gameId: string;
  password: null | number;
  minPlayers: number;
  maxPlayers: number;
};

interface ICreateGameRoomContext {
  roomForm: defaultRoomForm;
  setRoomForm: ({}: defaultRoomForm) => void;
}

export const defaultRoomForm: defaultRoomForm = {
  name: "",
  gameId: "",
  password: null,
  minPlayers: 3,
  maxPlayers: 6,
};

const CreateGameRoomContext = createContext<ICreateGameRoomContext>({
  roomForm: defaultRoomForm,
  setRoomForm: () => {},
});

export default CreateGameRoomContext;
