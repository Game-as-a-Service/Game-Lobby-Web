import { GetStaticProps } from "next";
import { useState } from "react";
import Button from "@/components/shared/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>遊戲大廳！</h1>
      <Button component={Link} href="/rooms">
        查看房間列表
      </Button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
