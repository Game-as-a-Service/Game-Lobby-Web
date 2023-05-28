import { useState, useEffect, useContext, FormEvent, ChangeEvent } from "react";
import Button from "@/shared/components/Button";
import GamePickModal from "./GamePickModal";
import { createRoomEndpoint, createRoomData } from "@/requests/rooms";
import { getAllGamesEndpoint } from "@/requests/games";
import useRequest from "@/shared/hooks/useRequest";
import { useRouter } from "next/router";
import { CreateRoomResponseType } from "@/pages/api/mock/rooms";
import { GameType } from "@/pages/api/mock/games";
import CreateGameRoomContext from "@/shared/contexts/CreateGameRoomContext";
import styles from "./createGameRoomModal.module.css";

export default function CreateGameRoomModalWithoutClassname() {
  const [gameList, setGameList] = useState<GameType[]>([]);
  const [showPickGameModal, setShowPickGameModal] = useState(false);
  const { fetch } = useRequest();
  const { push } = useRouter();
  const { roomForm, setRoomForm } = useContext(CreateGameRoomContext);
  const [currentGame, setCurrentGame] = useState<GameType | undefined>(
    undefined
  );

  // 取得遊戲清單
  useEffect(() => {
    async function handleGetAllGame() {
      const result = (await fetch(getAllGamesEndpoint())) as any as GameType[];
      setGameList(result);
    }
    handleGetAllGame();
  }, [fetch]);

  useEffect(() => {
    const game = gameList.find((game) => game.id === roomForm.gameId);
    game && setCurrentGame(game);
  }, [roomForm.gameId, gameList]);

  // 建立房間使用的假資料，要取代為你建立的 form state
  const mockCreateData: createRoomData = {
    name: "歡迎進場",
    gameId: "3345678",
    password: null,
    minPlayers: 3,
    maxPlayers: 6,
  };

  // 變更遊戲事件
  function handleChangeGame(gameId: string) {
    setRoomForm({ ...roomForm, gameId });
  }

  // 變更遊戲最大人數事件
  function handleChangeMaxplayers(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setRoomForm({ ...roomForm, maxPlayers: Number(value) });
  }

  // input handler
  const handleinputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "minPlayers") {
      return setRoomForm({ ...roomForm, [name]: Number(value) });
    } else if (name === "password" && value === "null") {
      const valueToNull = null;
      return setRoomForm({ ...roomForm, [name]: valueToNull });
    } else if (name === "password") {
      return setRoomForm({ ...roomForm, [name]: Number(value) });
    }
    setRoomForm({ ...roomForm, [name]: value });
  };

  // 創建房間事件
  async function handleCreateRoom() {
    const result = (await fetch(
      createRoomEndpoint(mockCreateData)
    )) as any as CreateRoomResponseType;

    push(`/rooms/${result.id}`);
  }

  return (
    <>
      {showPickGameModal ? (
        <GamePickModal
          activeGameId={roomForm.gameId}
          gameList={gameList}
          onGameChange={handleChangeGame}
          onClose={() => setShowPickGameModal(false)}
        />
      ) : (
        <form className="">
          <div className="">
            <div className="">
              <label htmlFor="name" className="">
                請輸入房間名稱
              </label>
              <input
                className=""
                onChange={handleinputChange}
                value={roomForm.name}
                name="name"
                id="name"
                required
              />
            </div>
            <div className="">
              <label htmlFor="gameId" className="">
                請選擇遊戲
              </label>
              <input
                className=""
                onChange={handleinputChange}
                value={roomForm.gameId}
                name="gameId"
                id="gameId"
                required
              />
              <button
                className="w-[28.11px] h-[28.11px] ml-[9px]"
                onClick={() => setShowPickGameModal(true)}
              >
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.8744 7.23721C17.9326 6.90908 16.9206 6.73071 15.867 6.73071C10.8212 6.73071 6.73071 10.8212 6.73071 15.867C6.73071 20.9128 10.8212 25.0033 15.867 25.0033C20.9128 25.0033 25.0033 20.9128 25.0033 15.867C25.0033 14.8134 24.8249 13.8013 24.4968 12.8595"
                    // stroke="#1E1F22"
                    // stroke-width="2.81116"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22.5909 3.52085C20.5936 2.4308 18.3026 1.81128 15.867 1.81128C8.10416 1.81128 1.81116 8.10428 1.81116 15.8671C1.81116 23.6299 8.10416 29.9229 15.867 29.9229C23.6298 29.9229 29.9228 23.6299 29.9228 15.8671C29.9228 13.4314 29.3033 11.1405 28.2132 9.14314"
                    // stroke="#1E1F22"
                    // stroke-width="2.81116"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M29.9228 1.81128L15.8669 15.8671"
                    // stroke="#1E1F22"
                    // stroke-width="2.81116"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-5">
            <span>請選擇人數</span>
            <div className="flex gap-[13px]">
              {Object.keys(Array.from({ length: 10 })).map((_, index) => (
                <div key={index + 1}>
                  <input
                    value={index + 1}
                    name="maxPlayers"
                    id={`radio-maxPlayers-${index + 1}`}
                    type="radio"
                    className={`radio__maxPlayers hidden ${styles.radio__maxPlayers}`}
                    checked={roomForm.maxPlayers === index + 1}
                    onChange={handleChangeMaxplayers}
                    disabled={
                      (currentGame && index + 1 > currentGame.maxPlayers) ||
                      (currentGame && index + 1 < currentGame.minPlayers)
                    }
                  />
                  <label
                    htmlFor={`radio-maxPlayers-${index + 1}`}
                    className="flex items-center justify-center h-[34px] w-[45px] border-[#1E1F22] border rounded-[10px] text-base cursor-pointer hover:border-[#2F88FF] hover:border-2 transition-colors"
                  >
                    {index + 1}人
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-row">
            <span>請選擇房間類型</span>
            <div>
              <label htmlFor="public" className="">
                <span>公開房間</span>
                <span>不須輸入密碼</span>
                <span>任何人都能加入此房間</span>
              </label>
              <input
                id="public"
                name="password"
                type="radio"
                value="null"
                className="hidden"
                onChange={handleinputChange}
              />
            </div>
            <div>
              <label htmlFor="private" className="">
                <span className="">私人房間</span>
                <span>請輸入此房間密碼</span>
              </label>
              <input
                id="private"
                name="password"
                type="radio"
                value="1234"
                className=""
                onChange={handleinputChange}
              />
              <span>{roomForm.password}</span>
              <span>{roomForm.password}</span>
              <span>{roomForm.password}</span>
              <span>{roomForm.password}</span>
              <input type="text" maxLength={1} className="" />
              {/* <label></label>
              <input />
              <label></label>
              <input />
              <label></label>
              <input /> */}
            </div>
          </div>
          <Button type="submit" onClick={handleCreateRoom}>
            開設新房間
          </Button>
        </form>
      )}
    </>
  );
}
