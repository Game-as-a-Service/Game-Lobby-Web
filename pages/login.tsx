import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@/components/shared/Button";
import Cover from "@/components/shared/Cover";
import Icon from "@/components/shared/Icon";

import useAuth from "@/hooks/context/useAuth";
import useUser from "@/hooks/useUser";
import { getEnv } from "@/lib/env";
import { LoginType } from "@/requests/auth";

import { NextPageWithProps } from "./_app";
import { IconName } from "@/components/shared/Icon/icons";

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
  }, [token]);

  const onLoginClick = async (e: SyntheticEvent, type: LoginType) => {
    if (isMock) {
      e.preventDefault();
      e.stopPropagation();

      const endpoint = await getLoginEndpoint(type);
      // mock: redirect to /auth/token
      window.location.href = endpoint.url;
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
        <Icon name="logo" />
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
  <div className="h-screen bg-[#252558]">
    <Cover
      src="/images/login_bg.png"
      alt="login cover"
      className="fixed bottom-0 w-[190%] lg:w-full bg-[#252558]"
    />
    <div className="h-full flex flex-col items-end justify-evenly">{page}</div>
    <footer className="p-3 fixed bottom-0 w-full text-center bg-[#679BF9]">
      &copy;{new Date().getFullYear()} 水球軟體學院
    </footer>
  </div>
);

export default Login;
