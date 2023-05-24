import { GetStaticProps } from "next";

import Button from "@/shared/components/Button";
import { useState, useEffect } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils";

type Room = {
  id: string;
  name: string;
  game: {
    id: string;
    name: string;
    imgUrl: string;
  };
  host: {
    id: string;
    nickname: string;
  };
  minPlayers: number;
  maxPlayers: number;
  isLock: boolean;
};

type RoomCardProps = {
  room: Room;
};

const RoomCard = ({ room }: RoomCardProps): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="grid grid-cols-[34px_1fr] gap-[12px] rounded-[10px] border border-[#1E1F22] py-[11px] pl-[11px] pr-[20px]">
      <div className="cover relative w-[34px] h-[34px] overflow-hidden rounded-[10px] bg-[#666]">
        <Image
          className={`
            w-full object-cover object-center
            ${loaded ? "" : "invisible"}
          `}
          fill={true}
          sizes="100vw"
          src="http://localhost:3030/images/game-avatar.jpg"
          onLoadingComplete={() => setLoaded(true)}
          alt={room.game.name}
          loading="lazy"
        />
      </div>
      <div className="grid gap-[7px]">
        <h3 className="text-white">{room.name}</h3>
        <div className="text-white">
          <span className="text-[var(--blue)]">{room.maxPlayers}</span>人房,還缺
          <span className="text-[var(--blue)]">2</span>人
        </div>
      </div>
    </div>
  );
};

const useGetRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);

  // react query
  // https://tanstack.com/query/v3/docs/react/guides/queries
  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    fetch("http://localhost:3030/api/mock/rooms", {
      signal: abortController.signal,
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((json) => setRooms(json.rooms))
      .catch((error) => setError(error));

    return () => abortController.abort();
  }, []);

  return { rooms, isLoading, error };
};

export default function Home() {
  const { rooms, isLoading, error } = useGetRooms();

  if (isLoading) {
    return (
      <>
        {/** Loading IMG */}
        <p>loading</p>
      </>
    );
  }

  return (
    <>
      <h1>遊戲大廳！</h1>
      <div className="bg-[#292A2D] rounded-[10px] py-[34px] px-[24px] m-[16px]">
        {rooms.length == 0 && <p>目前沒有房間</p>}

        <h2 className="text-bold">正在等待玩家配對</h2>
        <div className="mx-auto grid grid-auto-fit gap-2.5 my-5">
          {rooms.map((room, idx) => (
            <RoomCard room={room} key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
