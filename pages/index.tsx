import { GetStaticProps } from "next";
import { useState } from "react";

import Button from "@/shared/components/Button";
import UserInfoModal from "@/core/lobby/components/UserInfoModal";
import usePagination from "@/shared/hooks/usePagination";
import useRequest from "@/shared/hooks/useRequest";
import { getRooms } from "@/requests/rooms";

export default function Home() {
  const { fetch } = useRequest();

  const [showUserInfoModal, setShowUserInfoModal] = useState(true);

  const { nextPage, backPage, setPerPage, data } = usePagination({
    source: (page: number, perPage: number) =>
      fetch(getRooms({ page, perPage })),
    defaultPerPage: 10,
  });

  const nextPerPage = () => {
    setPerPage(10);
  };

  const backPerPage = () => {
    setPerPage(-10);
  };

  return (
    <>
      <h1>遊戲大廳！</h1>

      {data &&
        data.length &&
        data.map((item) => <p key={item.id}>{JSON.stringify(item)}</p>)}

      <Button onClick={backPage}>上一頁</Button>
      <Button onClick={nextPage}>下一頁</Button>
      <Button onClick={nextPerPage}>我要+10筆</Button>
      <Button onClick={backPerPage}>我要-10筆</Button>
      {showUserInfoModal && <UserInfoModal isOpen={showUserInfoModal} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
