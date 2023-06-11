import { GetStaticProps } from "next";
import Button from "@/components/shared/Button";
import CreateRoomModal from "@/components/lobby/CreateRoomModal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-white">遊戲大廳！</h1>
      <CreateRoomModal />
      <Button component={Link} href="/rooms">
        查看房間列表
      </Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
