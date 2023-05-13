import { FormEvent } from "react"
import { GetStaticProps } from "next";

import Button from "@/shared/components/Button";
import FormValidation from "@/shared/components/FormValidation";

export default function Home() {

  const handleSubmit = (name: string) => {
    console.log(name)
  }
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button></Button >
      <FormValidation submit={handleSubmit} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
