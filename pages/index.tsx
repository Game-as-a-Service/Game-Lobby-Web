import { FormEvent } from "react"
import { GetStaticProps } from "next";
import Head from "next/head";
import { siteTitle } from "@/shared/components/Layout";
import Button from "@/shared/components/Button";
import FormValidation from "@/shared/components/FormValidation";

export default function Home() {

  const handleSubmit = (name: string) => {
    console.log(name)
  }
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
