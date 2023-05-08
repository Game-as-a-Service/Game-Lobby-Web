import { GetStaticProps } from "next";
import Head from "next/head";
import { siteTitle } from "@/shared/components/Layout";
import Button from "@/shared/components/Button";
import FormValidation from "@/shared/components/FormValidation";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>遊戲大廳！</h1>
      <Button></Button >
      <FormValidation />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
