import { GetStaticProps } from "next";
import Button from "@/shared/components/Button";
import { useState, useContext } from "react";
import Modalow from "@/shared/components/Modalow";
import CreateRoomModal from "./components/CreateGameRoom/CreateRoomModal";
import CreateGameRoomContext from "@/shared/contexts/CreateGameRoomContext";
const mockUserSelectGameData = {
  gameId: "string2",
  minPlayers: 3,
  maxPlayers: 7,
  displayName: "string",
};

export default function Home() {
  const [show, setShow] = useState(false);
  const { roomForm, setRoomForm } = useContext(CreateGameRoomContext);
  function handleClickCreateRoom() {
    setRoomForm({
      ...roomForm,
      gameId: mockUserSelectGameData.gameId,
      minPlayers: mockUserSelectGameData.minPlayers,
      maxPlayers: mockUserSelectGameData.maxPlayers,
    });
    setShow(true);
  }
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={handleClickCreateRoom}>開創房間</Button>

      <Modalow
        title="title"
        hasTitle={false}
        isOpen={show}
        onClose={() => setShow(false)}
        size="extraLarge"
      >
        <CreateRoomModal />
      </Modalow>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
