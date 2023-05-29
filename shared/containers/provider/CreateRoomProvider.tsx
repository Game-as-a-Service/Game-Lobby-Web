import { GameType } from "@/core/lobby/components/CreateGameRoom/type";
import CreateGameRoomContext, {
  initCreateRoomForm,
  CreateRoomFormType,
} from "@/shared/contexts/CreateRoomContext";
import { FC, ReactNode, useState } from "react";
import { createRoomEndpoint } from "@/requests/rooms";
type Props = {
  children: ReactNode;
};

const CreateGameRoomContextProvider: FC<Props> = ({ children }) => {
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
    <CreateGameRoomContext.Provider
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
    </CreateGameRoomContext.Provider>
  );
};

export default CreateGameRoomContextProvider;
