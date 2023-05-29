import { GetStaticProps } from "next";
import { useState } from "react";
import Button from "@/shared/components/Button";
import useUser from "@/shared/hooks/useUser";
import UserInfoModal from "@/core/lobby/components/UserInfoModal";
import CreateRoomModal from "@/core/lobby/components/CreateGameRoom";

export default function Home() {
  const { logout } = useUser();

  const [showUserInfoModal, setShowUserInfoModal] = useState(true);

  return (
    <>
      <h1>遊戲大廳！</h1>
      <CreateRoomModal />
      <Button onClick={logout}>登出</Button>
      {showUserInfoModal && <UserInfoModal isOpen={showUserInfoModal} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
