import { GetStaticProps } from "next";
import GamePickModal from "./components/GamePickModal";
import Button from "@/shared/components/Button";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  const [activeGameId, setActiveGameId] = useState("string3");
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={() => setShow(true)}>open</Button>
      {/* TODO 還在研究 ModalManager 怎麼使用 */}
      {activeGameId}
      {show && (
        <GamePickModal
          activeGameId={activeGameId}
          gameList={mockGameList}
          onGameChange={(id) => setActiveGameId(id)}
          onClose={() => setShow(false)}
        />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const mockGameList = [
  {
    id: "string",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
    category: "戰略",
  },
  {
    id: "string2",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string3",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string4",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string5",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string6",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string7",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string8",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
  {
    id: "string9",
    displayName: "string",
    imageUrl: "/undefined",
    minPlayers: 0,
    maxPlayers: 0,
  },
];
