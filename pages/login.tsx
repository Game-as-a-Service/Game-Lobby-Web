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
import Icon from "@/components/shared/Icon";

import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { getEnv } from "@/lib/env";
import { LoginType } from "@/requests/auth";

import { NextPageWithProps } from "./_app";
import { IconName } from "@/components/shared/Icon/icons";
import { BoxFancy } from "@/components/shared/BoxFancy";
import Link from "next/link";

const LoginMethods: { text: string; type: LoginType; icon: IconName }[] = [
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
        iconName={icon}
        variant={ButtonType.SECONDARY}
        onClick={(e: SyntheticEvent) => onLoginClick(e, type)}
      >
        {text}
      </ButtonV2>
    ));
  }, [internalEndpoint, onLoginClick]);

  return checkAuth ? (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center p-4">
      <div className="flex-1">
        <h2 className="flex-1 relative flex items-center text-[22px] font-normal text-white z-10">
          <Icon name="logo" className="w-12 h-12" />
          遊戲微服務大平台
        </h2>

        <p className="text-white text-xl">一起創造與冒險！</p>
        <p>加入遊戲微服務大平台，和100+遊戲開發者共同創建更多可能！</p>
      </div>

      <div className="flex-1 min-w-[210px] px-6 flex flex-col w-full gap-2">
        {loginButtons}
      </div>
    </div>
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
    <div className="w-full h-full p-4 md:p-8 lg:px-36 lg:py-24">
      <BoxFancy>
        <div className="w-full h-full">{page}</div>
      </BoxFancy>
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
