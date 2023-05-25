import { createContext } from "react";

type CreateRoomForm = {
  roomName: string;
  choosedGame: string;
  players: string;
  roomType: string;
  password?: null | number;
};

const createGameRoomDefault: CreateRoomForm = {
  roomName: "",
  choosedGame: "",
  players: "",
  roomType: "",
  password: null,
};

const CreateGameRoom = createContext(createGameRoomDefault);

export default CreateGameRoom;
