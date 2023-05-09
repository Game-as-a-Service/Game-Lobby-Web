import { GetStaticProps } from "next";
import Head from "next/head";
import { siteTitle } from "@/shared/components/Layout";
import Button from "@/shared/components/Button";
import Tag, { COLOR } from "@/shared/components/Tag/Tag";

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>遊戲大廳！</h1>
      <Button></Button>
      <Tag color={COLOR.COLOR1}>121212121</Tag>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
