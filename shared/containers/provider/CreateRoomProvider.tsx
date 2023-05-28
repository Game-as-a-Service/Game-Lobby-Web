import CreateGameRoomContext, {
  initCreateRoomForm,
} from "@/shared/contexts/CreateRoomContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const CreateGameRoomContextProvider: FC<Props> = ({ children }) => {
  const [roomForm, setRoomForm] = useState(initCreateRoomForm);

  return (
    <CreateGameRoomContext.Provider
      value={{
        roomForm,
        setRoomForm,
      }}
    >
      {children}
    </CreateGameRoomContext.Provider>
  );
};

export default CreateGameRoomContextProvider;
