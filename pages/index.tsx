import { GetStaticProps } from "next";
import Button from "@/shared/components/Button";

export default function Home() {
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button></Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
