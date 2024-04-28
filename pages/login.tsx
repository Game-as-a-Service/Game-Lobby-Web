import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ButtonV2, { ButtonType } from "@/components/shared/Button/v2";
import Cover from "@/components/shared/Cover";
import IconV2 from "@/components/shared/Icon/v2";

import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { getEnv } from "@/lib/env";
import { LoginType } from "@/requests/auth";

import { NextPageWithProps } from "./_app";
import { BoxFancy } from "@/components/shared/BoxFancy";
import Link from "next/link";
import { IconNameV2 } from "@/components/shared/Icon/v2/icons";

const LoginMethods: { text: string; type: LoginType; icon: IconNameV2 }[] = [
  { text: "Google 帳號登入", type: LoginType.GOOGLE, icon: "google" },
  { text: "GitHub 帳號登入", type: LoginType.GITHUB, icon: "github" },
  { text: "LinkedIn 帳號登入", type: LoginType.LINKEDIN, icon: "linkedin" },
  { text: "Discord 帳號登入", type: LoginType.DISCORD, icon: "discord" },
];

const Login: NextPageWithProps = () => {
  const { getLoginEndpoint } = useUser();
  const { token } = useAuth();
  const { push } = useRouter();
  const [checkAuth, setCheckAuth] = useState(false);
  const { internalEndpoint, isMock } = getEnv();

  useEffect(() => {
    if (token) {
      push("/");
    } else {
      setCheckAuth(true);
    }
  }, [token, push]);

  const onLoginClick = useCallback(
    async (e: SyntheticEvent, type: LoginType) => {
      if (isMock) {
        e.preventDefault();
        e.stopPropagation();

        const endpoint = await getLoginEndpoint(type);
        // mock: redirect to /auth/token
        push(endpoint.url);
      }
    },
    [getLoginEndpoint, isMock, push]
  );

  const loginButtons = useMemo(() => {
    return LoginMethods.map(({ text, type, icon }) => (
      <ButtonV2
        key={type}
        component={Link}
        href={`${internalEndpoint}/login?type=${type}`}
        className={"w-full min-w-[300px] max-w-[50%] xl:max-w-[318px]"}
        boxFancyClassName={"text-primary-50"}
        iconName={icon}
        variant={ButtonType.SECONDARY}
        onClick={(e: SyntheticEvent) => onLoginClick(e, type)}
      >
        {text}
      </ButtonV2>
    ));
  }, [internalEndpoint, onLoginClick]);

  return checkAuth ? (
    <>
      <div className="relative w-full h-full flex flex-col xl:flex-row justify-between items-center p-4 gap-[18px]">
        {/* fog */}
        <div
          className={
            "absolute xl:-top-5 xl:-right-5 xl:w-[58%] xl:h-[calc(100%+40px)] rounded-2xl gradient-light shadow blur-[20px]"
          }
        />
        <div className="px-2 sm:px-6 xl:pl-24 2xl:px-24 flex-1 flex flex-col justify-center items-start">
          <h2 className="relative flex items-center text-[22px] font-normal text-primary-100 mb-12">
            <IconV2 name="leadingIcon" className="w-12 h-12" />
            遊戲微服務大平台
          </h2>
          <p className="text-primary-50 text-[32px] font-medium mb-4">
            一起創造與冒險！
          </p>
          <p className="text-primary-50 text-[22px] font-normal">
            加入遊戲微服務大平台，和100+遊戲開發者共同創建更多可能！
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center w-full px-[124px] gap-5">
          {loginButtons}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

Login.Anonymous = true;

Login.getLayout = (page) => (
  <div className="w-screen h-screen bg-[#252558]">
    <Cover
      src="/images/v2/login-bg.png"
      alt="login cover"
      className="fixed w-full h-screen bg-[#252558]"
      fill
    />
    <div className="w-full h-full p-4 md:p-8 xl:px-36 xl:py-24">
      <BoxFancy className={"container m-auto"}>{page}</BoxFancy>
    </div>
  </div>
);

export default Login;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh-TW", [""])),
    },
  };
};
