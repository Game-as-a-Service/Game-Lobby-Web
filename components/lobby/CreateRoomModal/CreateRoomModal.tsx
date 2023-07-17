import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Button from "@/components/shared/Button";
import Modalow from "@/components/shared/Modalow";
import GameListModal from "./GameListModal";
import Input from "@/components/shared/Input";
import useRequest from "@/hooks/useRequest";
import { useRouter } from "next/router";
import { createRoomEndpoint, CreateRoomFormType } from "@/requests/rooms";
import { getAllGamesEndpoint, GameType } from "@/requests/games";
import styles from "./createRoomModall.module.css";
import PasswordField from "@/components/shared/PasswordField";
import Icon from "@/components/shared/Icon";
import { target } from "@/components/shared/Icon/group/target";

const initialRoomFormState = {
  name: "",
  gameId: "",
  password: null,
  minPlayers: 0,
  maxPlayers: 0,
};

export default function CreateRoomModal() {
  const [showThisModal, setshowThisModal] = useState(false);
  const [showGameListModal, setShowGameListModal] = useState(false);
  const [gameList, setGameList] = useState<GameType[]>([]);
  const [roomForm, setRoomForm] =
    useState<CreateRoomFormType>(initialRoomFormState);
  const [currentGame, setCurrentGame] = useState<GameType | undefined>(
    undefined
  );
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [passwordValues, setPasswordValues] = useState(["", "", "", ""]);
  const { fetch } = useRequest();
  const { push } = useRouter();

  useEffect(() => {
    setRoomForm((prev) => ({
      ...prev,
      password: passwordValues.join(""),
    }));
  }, [passwordValues]);

  // get game list
  useEffect(() => {
    async function handleGetAllGame() {
      const result = await fetch(getAllGamesEndpoint());
      setGameList(result);
    }
    handleGetAllGame();
  }, [fetch]);

  function handleChangeGame(gameId: string) {
    const game = gameList.find((game) => game.id === gameId);
    if (game) {
      setCurrentGame(game);
      setRoomForm((prev) => ({
        ...prev,
        gameId: game.id,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
      }));
    }
    setShowGameListModal(false);
  }

  function handleChangeRoomName(value: string) {
    setRoomForm((prev) => ({ ...prev, name: value }));
  }

  function handleChangeMaxplayers(event: ChangeEvent<HTMLInputElement>) {
    setRoomForm((prev) => ({
      ...prev,
      maxPlayers: Number(event.target.value),
    }));
  }

  function handleRoomTypeChange(event: ChangeEvent<HTMLInputElement>) {
    const isPublic = event.target.value === "public";
    setIsPublic(isPublic);
  }

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    // valid
    if (!roomForm.gameId) return;
    if (!isPublic && roomForm.password?.length !== 4) return;
    // send request
    const result = await fetch(createRoomEndpoint(roomForm));
    push(`/rooms/${result.id}`);
  }

  function handleCloseModal() {
    setShowGameListModal(false);
    setshowThisModal(false);
  }

  function getPasswordSelected(e: React.MouseEvent<HTMLElement>) {
    setIsPublic(false);
  }

  return (
    <>
      <Button onClick={() => setshowThisModal(true)}>開創房間</Button>
      <Modalow
        title="create-room"
        hasTitle={false}
        isOpen={showThisModal}
        onClose={handleCloseModal}
        size="xLarge"
      >
        {showGameListModal ? (
          <GameListModal
            activeGameId={roomForm.gameId}
            gameList={gameList}
            onGameChange={handleChangeGame}
            onClose={() => setShowGameListModal(false)}
          />
        ) : (
          <form className="flex flex-col gap-[24px] py-10 px-[55px] lg:h-[500px] mx-auto">
            <div className="flex">
              <div className="w-full">
                <Input
                  label="請輸入房間名稱"
                  onChange={handleChangeRoomName}
                  value={roomForm.name}
                  name="name"
                  id="name"
                  required
                  className="w-full"
                  //  errorMessage={"請選擇遊戲"}
                  //  errorClassName="flex justify-end" // 若需要實作 error message，需加入行高防止抖動。
                />
              </div>
            </div>
            <div className="flex items-center relative">
              <div className="w-full">
                <Input
                  inputClassName="cursor-pointer"
                  label="請選擇遊戲"
                  value={currentGame?.name}
                  required
                  readOnly
                  onClick={() => setShowGameListModal(true)}
                  error={roomForm.gameId === ""}
                  // errorMessage={"請選擇遊戲"}
                  // errorClassName="flex justify-end"  // 若需要實作 error message，需加入行高防止抖動。
                />
              </div>
              <button
                type="button"
                className="w-[28.11px] h-[28.11px] ml-[9px] absolute top-0 right-[-8px] translate-x-[100%] "
                onClick={() => setShowGameListModal(true)}
              >
                <Icon
                  className="stroke-[2.8116] stroke-[#1E1F22] hover:stroke-[#2F88FF]"
                  icon={target}
                />
              </button>
            </div>
            <div className="flex gap-2 ">
              <Input
                label="請選擇人數"
                inputClassName="hidden"
                className="w-[120px] md:w-[145px] lg:w-[192px]"
              />
              <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-[13px]">
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
                      className="flex items-center justify-center h-[34px] w-[45px] border-[#1E1F22] border rounded-[10px] text-base cursor-pointer hover:border-[#2F88FF] hover:border-1 transition-colors"
                    >
                      {index + 1}人
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex">
              <Input
                label="請選擇房間類型"
                inputClassName="hidden"
                className="inline-block min-w-[145px]"
              />
              <div className="flex gap-[21px] lg:gap-[42px] lg:mx-auto flex-col lg:flex-row">
                <div>
                  <input
                    id="radio-isPublic-public"
                    name="isPublic"
                    type="radio"
                    value="public"
                    className={`hidden ${styles.radio__isPublic}`}
                    checked={isPublic}
                    onChange={handleRoomTypeChange}
                  />
                  <label
                    htmlFor="radio-isPublic-public"
                    className="block label__container w-[200px] h-[133px] rounded-[10px] border border-[#1E1F22] pt-[14px] px-6 text-center text-base cursor-pointer"
                  >
                    公開房間
                    <div className="text-sm mt-[14px] flex flex-col">
                      <span>不須輸入密碼</span>
                      <span>任何人都能加入此房間</span>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    id="radio-isPublic-private"
                    name="isPublic"
                    type="radio"
                    value="private"
                    className={`hidden ${styles.radio__isPublic}`}
                    checked={!isPublic}
                    onChange={handleRoomTypeChange}
                  />

                  <label
                    htmlFor="radio-isPublic-private"
                    className="block label__container w-[200px] h-[133px] rounded-[10px] border border-[#1E1F22] pt-[14px] px-6 text-center text-base cursor-pointer"
                  >
                    <PasswordField
                      active={!isPublic}
                      title={"私人房間"}
                      subTitle={"請輸入此房間密碼"}
                      passwordValues={passwordValues}
                      setPasswordValues={setPasswordValues}
                      onInputClick={getPasswordSelected}
                    />
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              onClick={handleCreateRoom}
              className="max-w-[446px] w-full flex justify-center text-white bg-[#2F88FF] rounded-[21px] self-center lg:mt-9"
            >
              開設新房間
            </Button>
          </form>
        )}
      </Modalow>
    </>
  );
}
