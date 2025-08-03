import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextPageWithProps } from "@/pages/_app";
import useAuthActions from "@/hooks/useAuthActions";

const Token: NextPageWithProps = () => {
  const { push, asPath } = useRouter();
  const regex = /^\/auth\/token\/(.+)$/;
  const token = asPath.match(regex)?.[1];

  const { login } = useAuthActions();
  useEffect(() => {
    if (token) {
      login(token as string);
      push("/");
    }
  }, [token, login, push]);

  return <></>;
};

Token.getLayout = (page) => page;
Token.Anonymous = true;

export default Token;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
