import { GetStaticProps } from "next";
import Button from "@/shared/components/Button";
import { useState } from "react";
import Modalow from "@/shared/components/Modalow";
import CreateGameRoomModal from "./components/CreateGameRoom";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={() => setShow(true)}>open</Button>

      <Modalow
        title="title"
        hasTitle={false}
        isOpen={show}
        onClose={() => setShow(false)}
        size="extraLarge"
      >
        <CreateGameRoomModal />
      </Modalow>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
