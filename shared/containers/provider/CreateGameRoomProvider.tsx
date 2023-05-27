import CreateGameRoomContext, {
  defaultRoomForm,
} from "@/shared/contexts/CreateGameRoomContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const CreateGameRoomContextProvider: FC<Props> = ({ children }) => {
  const [roomForm, setRoomForm] = useState(defaultRoomForm);

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
