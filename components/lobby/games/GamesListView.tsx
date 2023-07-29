import { FC, useState, useEffect } from "react";
import useRequest from "@/hooks/useRequest";
import usePagination from "@/hooks/usePagination";
import Button from "@/components/shared/Button";
import {
  GamesList,
  GamesListWrapper,
} from "@/components/lobby/games/GamesList";
import Card from "@/components/shared/Card";
import CardActions from "@/components/shared/Card/CardActions";
import { getLobbyGames } from "@/requests/games";

type Props = {
  status?: string;
};

const GamesListView: FC<Props> = ({ status }) => {
  const { fetch } = useRequest();
  const {
    nextPage,
    backPage,
    setPerPage,
    data,
    loading,
    isError,
    errorMessage,
  } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getLobbyGames({ page, perPage })),
    defaultPerPage: 20,
  });

  const nextPerPage = () => {
    setPerPage(10);
  };

  const backPerPage = () => {
    setPerPage(-10);
  };

  const Pagination = () => {
    return (
      <div className="flex justify-center items-center gap-2">
        <Button onClick={backPage}>上一頁</Button>
        <Button onClick={nextPage}>下一頁</Button>
        <Button onClick={nextPerPage}>我要+10筆</Button>
        <Button onClick={backPerPage}>我要-10筆</Button>
      </div>
    );
  };

  if (loading)
    return <div className="py-10 text-white text-center">Loading...</div>;
  if (isError)
    return (
      <div className="flex flex-col py-5 text-rose-500 text-center">
        Response Error: {errorMessage}
      </div>
    );

  return (
    <>
      <GamesList>
        <GamesListWrapper>
          {data.length > 0 &&
            data.map((game, index) => (
              <Card
                key={`${game.id}_${index}`}
                className="w-full"
                game={game}
                actions={<CardActions />}
              />
            ))}
        </GamesListWrapper>
        <Pagination />
      </GamesList>
    </>
  );
};

export default GamesListView;
