import { GetStaticProps } from "next"

import Button from "@/shared/components/Button";
import ModalExample1 from "@/shared/components/Modal/example/ModalExample1";
import ModalExample2 from "@/shared/components/Modal/example/ModalExample2";
import ModalExample3 from "@/shared/components/Modal/example/ModalExample3";

export default function Home() {
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button></Button>
      <ModalExample1 />
      <ModalExample2 />
      <ModalExample3 />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
