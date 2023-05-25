import { GetStaticProps } from "next";

import Button from "@/shared/components/Button";
import Toast from "@/shared/components/Toast";
import { useCallback, useRef, useState } from "react";
import { useToast } from "@/shared/components/Toast/useToast";
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();
  const [toastCount, setToastCount] = useState(0);

  const handleAddToast = useCallback(() => {
    setToastCount((prev) => prev + 1);
    toast(
      <Toast state={"success"} size={"lg"} length={"md"}>
        GG EZ
      </Toast>
    );
  }, [toast]);

  const handleAddRefToast = () => {
    setToastCount((prev) => prev + 1);
    toast(
      {
        state: "info",
        size: "md",
        length: "sm",
        children: toastCount + ": Capitalism, Ho!",
      },
      { targetEl: ref.current, position: "bottom-right" }
    );
  };

  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button onClick={handleAddToast}>
        What is the best thing to say after victory?
      </Button>
      <div className={"fixed right-0 top-0 bottom-0"}>
        <div
          ref={ref}
          className={"p-[9px] h-full w-[300px] bg-amber-200 relative"}
        >
          <Button onClick={handleAddRefToast}>useToast with targetEl</Button>
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
