import { useState } from "react";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import GamePickModal from "../GamePickModal";
import { values } from "cypress/types/lodash";

export default function CreateGameRoomModal() {
  const [roomName, setRoomName] = useState("");
  const [pickGame, setPickGame] = useState(false);
  const [activeGameId, setActiveGameId] = useState("string3");
  return (
    <>
      {pickGame ? (
        <GamePickModal
          activeGameId={activeGameId}
          gameList={mockGameList}
          onGameChange={(id) => setActiveGameId(id)}
          onClose={() => setPickGame(false)}
        />
      ) : (
        <form className="bg-[#292A2D] rounded-[10px] flex flex-col">
          <Input
            inputClassName="w-[651px] h-[34px] bg-[#1E1F22]  rounded-[10px]"
            labelClassName="w-[119px] h-[24px] text-[16px] leading-[24px] border-0 before:contents-[''] before:w-1 before:h-4 before:bg-[#2F88FF] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%]"
            onChange={(e) => {
              setRoomName(e);
            }}
            value={roomName}
            name="roomName"
            label="請輸入房間名稱"
            required
          />
          <div className="flex">
            <Input
              className="w-[651px] h-[34px]"
              onChange={(e) => {
                setRoomName(e);
              }}
              value={roomName}
              name="roomName"
              onKeyUp={() => {}}
              label="請選擇遊戲"
              required
            />
            <button onClick={() => setPickGame(true)}>
              <svg
                className="stroke-[2.8116] stroke-[#1E1F22] hover:stroke-[#2F88FF]"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0518 12.0598C12.6315 12.7382 11.6503 14.1879 11.6503 15.8669C11.6503 18.1957 13.5382 20.0836 15.867 20.0836C17.546 20.0836 18.9958 19.1024 19.6742 17.6821"
                  // stroke="#1E1F22"
                  // stroke-width="2.81116"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.8744 7.23721C17.9326 6.90908 16.9206 6.73071 15.867 6.73071C10.8212 6.73071 6.73071 10.8212 6.73071 15.867C6.73071 20.9128 10.8212 25.0033 15.867 25.0033C20.9128 25.0033 25.0033 20.9128 25.0033 15.867C25.0033 14.8134 24.8249 13.8013 24.4968 12.8595"
                  // stroke="#1E1F22"
                  // stroke-width="2.81116"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.5909 3.52085C20.5936 2.4308 18.3026 1.81128 15.867 1.81128C8.10416 1.81128 1.81116 8.10428 1.81116 15.8671C1.81116 23.6299 8.10416 29.9229 15.867 29.9229C23.6298 29.9229 29.9228 23.6299 29.9228 15.8671C29.9228 13.4314 29.3033 11.1405 28.2132 9.14314"
                  // stroke="#1E1F22"
                  // stroke-width="2.81116"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M29.9228 1.81128L15.8669 15.8671"
                  // stroke="#1E1F22"
                  // stroke-width="2.81116"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <Input
            onChange={(e) => {
              setRoomName(e);
            }}
            value={roomName}
            name="roomName"
            label="請選擇人數"
            required
          />

          <Input
            onChange={(e) => {
              setRoomName(e);
            }}
            value={roomName}
            name="roomName"
            label="請選擇房間類型"
            required
          />
          <Button type="submit">開設新房間</Button>
        </form>
      )}
    </>
  );
}

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
