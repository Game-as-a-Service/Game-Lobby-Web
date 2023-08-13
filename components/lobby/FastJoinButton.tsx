import { ChangeEvent, FC, useState, useEffect } from "react";
import Button from "@/components/shared/Button";
import { getAllGamesEndpoint, GameType } from "@/requests/games";
import useRequest from "@/hooks/useRequest";
import { fastJoinGameEndpoint } from "@/requests/rooms";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useToast } from "@/components/shared/Toast";

const FastJoinButton: FC = () => {
  const { fetch } = useRequest();
  const [selectedOption, setSelectedOption] = useState<null | GameType>(null);
  const [gameListOptions, setGameListOptions] = useState<GameType[]>([]);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const toast = useToast();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selectedOption = gameListOptions.find(
      (option) => option.id === selectedValue
    );
    if (!selectedOption) throw new Error("selected option not found");
    setSelectedOption(selectedOption);
  };

  const handleFastJoin = async () => {
    try {
      if (!selectedOption) throw new Error("selected option not found");
      setLoading(true);
      const { roomId } = await fetch(fastJoinGameEndpoint(selectedOption.id), {
        toast: {
          show: false,
        },
      });
      push(`/rooms/${roomId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(
          { state: "error", children: error.response?.data.message },
          {
            position: "bottom-left",
          }
        );
      } else {
        toast(
          { state: "error", children: `無法預期的錯誤： ${error}` },
          {
            position: "bottom-left",
          }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // get game list
  useEffect(() => {
    async function handleGetAllGame() {
      const result = await fetch(getAllGamesEndpoint());
      setGameListOptions(result);
      setSelectedOption(result[0]);
    }
    handleGetAllGame();
  }, [fetch]);

  return (
    <>
      <div className="flex my-1">
        <Button loading={loading} suffix onClick={handleFastJoin}>
          快速加入
        </Button>

        <div className="relative inline-flex">
          <select
            className="appearance-none bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={selectedOption?.id}
            onChange={handleSelectChange}
          >
            {gameListOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default FastJoinButton;
