import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NextPageWithProps } from "../_app";
import useUser from "@/hooks/useUser";

// This page is for mock redirect
const Login: NextPageWithProps = () => {
  const { getMockToken } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    async function fetch() {
      const res = await getMockToken();
      if (res.token) {
        push(`/auth/token/${res.token}`);
      }
    }

    fetch();
  }, []);

  return <></>;
};

Login.getLayout = (page) => page;
Login.Anonymous = true;

export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
