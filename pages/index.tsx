import { GetStaticProps } from "next";

import Button from "@/shared/components/Button";
import useUser from "@/shared/hooks/useUser";

export default function Home() {
  const { logout } = useUser();

  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={logout}>登出</Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
