import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Button from "@/components/shared/Button";
import Cover from "@/components/shared/Cover";
import Icon from "@/components/shared/Icon";

import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { getEnv } from "@/lib/env";
import { LoginType } from "@/requests/auth";

import { NextPageWithProps } from "./_app";
import { IconName } from "@/components/shared/Icon/icons";
import { cn } from "@/lib/utils";

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

  const onLoginClick = async (e: SyntheticEvent, type: LoginType) => {
    if (isMock) {
      e.preventDefault();
      e.stopPropagation();

      const endpoint = await getLoginEndpoint(type);
      // mock: redirect to /auth/token
      push(endpoint.url);
    }
  };

  const buttons: { text: string; type: LoginType; icon: IconName }[] = [
    { text: "Google 登入", type: LoginType.GOOGLE, icon: "google" },
    { text: "GitHub 登入", type: LoginType.GITHUB, icon: "github" },
    { text: "LinkedIn 登入", type: LoginType.LINKEDIN, icon: "linkedin" },
    { text: "Discord 登入", type: LoginType.DISCORD, icon: "discord" },
  ];

  return checkAuth ? (
    <div className="lg:w-1/2 w-full flex flex-col items-center">
      <h1 className="relative flex gap-10 items-center text-[40px] font-normal text-white z-10">
        <Icon name="logo" className="w-20 h-20" />
        遊戲線上揪
      </h1>

      <div className="pt-[15%] px-6 flex flex-col w-full items-center gap-2">
        {buttons.map(({ text, type, icon }) => (
          <Button
            key={type}
            component="a"
            href={`${internalEndpoint}/login?type=${type}`}
            className="group py-3 bg-[#D4DAE8] text-[#1E1F22] justify-center max-w-xs w-full rounded-[21px] hover:bg-blue2f hover:text-white"
            onClick={(e: SyntheticEvent) => onLoginClick(e, type)}
            prefix={
              <Icon
                name={icon}
                className="w-6 fill-blue2f group-hover:fill-white"
              />
            }
          >
            {text}
          </Button>
        ))}
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
      <div
        className={cn(
          // Gradient border with semi-transparent background tips:
          // The border-radius of ::before should be as consistent as possible with the original,
          // and the border-radius size must be at least twice that of ::before.padding,
          // otherwise, the inner circle will protrude.
          "w-full h-full relative bg-black/40 rounded-2xl effect-new-2",
          "before:w-full before:h-full before:absolute before:top-0 before:left-0 before:rounded-2xl before:p-[1px]",
          "before:gradient-purple, before:[mask:linear-gradient(#fff_0_0)_exclude_content-box,linear-gradient(#fff_0_0)]"
        )}
      >
        <div className="h-full flex flex-col items-end justify-evenly">
          {page}
        </div>
      </div>
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
