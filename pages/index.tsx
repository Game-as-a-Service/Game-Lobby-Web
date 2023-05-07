import { GetStaticProps } from "next";
import Head from "next/head";
import { siteTitle } from "@/shared/components/layout";
import Button from "@/shared/components/button/button";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
