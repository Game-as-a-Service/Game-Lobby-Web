import { GameType } from "@/requests/games";
import CreateRoomContext, {
  initCreateRoomForm,
  CreateRoomFormType,
} from "@/contexts/CreateRoomContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const CreateRoomContextProvider: FC<Props> = ({ children }) => {
  const [roomForm, setRoomForm] = useState(initCreateRoomForm);
  const [currentGame, setCurrentGame] = useState<GameType | undefined>(
    undefined
  );
  function updateGame(game: GameType) {
    setCurrentGame(game);
    setRoomForm((prev) => ({
      ...prev,
      gameId: game.id,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
    }));
  }

  function updateRoomName(name: CreateRoomFormType["name"]) {
    setRoomForm((prev) => ({
      ...prev,
      name,
    }));
  }

  function updateMaxplayers(maxPlayers: GameType["maxPlayers"]) {
    setRoomForm((prev) => ({
      ...prev,
      maxPlayers,
    }));
  }

  function updatePassword(password: CreateRoomFormType["password"]) {
    setRoomForm((prev) => ({
      ...prev,
      password,
    }));
  }

  return (
    <CreateRoomContext.Provider
      value={{
        currentGame,
        roomForm,
        updateGame,
        updateRoomName,
        updateMaxplayers,
        updatePassword,
      }}
    >
      {children}
    </CreateRoomContext.Provider>
  );
};

export default CreateRoomContextProvider;
