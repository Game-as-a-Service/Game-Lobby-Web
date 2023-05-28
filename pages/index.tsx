import { GetStaticProps } from "next";
import CreateRoomModal from "./components/CreateGameRoom/CreateRoomModal";

export default function Home() {
  return (
    <>
      <h1>遊戲大廳！</h1>
      <CreateRoomModal />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
