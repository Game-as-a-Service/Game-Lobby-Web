import { GetStaticProps } from "next";

import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { MyModal } from "@/shared/components/Modal";
import { useState } from "react";
import { useToast } from "@/shared/components/Toast/useToast";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const toast = useToast({
    Component: (
      <Toast state={"success"} size={"lg"} length={"md"}>
        GG EZ
      </Toast>
    ),
  });

  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={() => setShowModal((prev) => !prev)}>
        What is the best thing to say after victory?
      </Button>
      {showModal && toast}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
