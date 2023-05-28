import { createContext, Dispatch, SetStateAction } from "react";

type CreateRoomFormType = {
  name: string;
  gameId: string;
  password: null | number;
  minPlayers: number;
  maxPlayers: number;
};

interface ICreateGameRoomContext {
  roomForm: CreateRoomFormType;
  setRoomForm: Dispatch<SetStateAction<CreateRoomFormType>>;
}

export const initCreateRoomForm: CreateRoomFormType = {
  name: "",
  gameId: "",
  password: null,
  minPlayers: 3,
  maxPlayers: 6,
};

const CreateGameRoomContext = createContext<ICreateGameRoomContext>({
  roomForm: initCreateRoomForm,
  setRoomForm: () => {},
});

export default CreateGameRoomContext;
