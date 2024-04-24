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
        component={"a"}
        iconName={icon}
        variant={ButtonType.SECONDARY}
        href={`${internalEndpoint}/login?type=${type}`}
        // className="group py-3 bg-[#D4DAE8] text-[#1E1F22] justify-center max-w-xs w-full rounded-[21px] hover:bg-blue2f hover:text-white"
        onClick={(e: SyntheticEvent) => onLoginClick(e, type)}

        // prefix={
        //   <Icon
        //     name={icon}
        //     className="w-6 fill-blue2f group-hover:fill-white"
        //   />
        // }
      >
        {text}
      </ButtonV2>
    ));
  }, [internalEndpoint, onLoginClick]);

  return checkAuth ? (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center">
      <h1 className="flex-1 relative flex gap-10 items-center text-[40px] font-normal text-white z-10">
        <Icon name="logo" className="w-20 h-20" />
        遊戲線上揪
      </h1>

      <div className="flex-1 min-w-[210px] px-6 flex flex-col w-full items-center gap-2">
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
        <div className="h-full flex flex-col items-end justify-evenly">
          {page}
        </div>
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
