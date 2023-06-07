import { LoginType } from "@/requests/auth";
import Button from "@/components/shared/Button";
import useUser from "@/hooks/useUser";
import { NextPageWithProps } from "./_app";
import { SyntheticEvent, useEffect, useState } from "react";
import useAuth from "@/hooks/context/useAuth";
import { useRouter } from "next/router";
import { getEnv } from "@/lib/env";

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
      alert(123);
      e.preventDefault();
      e.stopPropagation();

      const endpoint = await getLoginEndpoint(type);
      // mock: redirect to /auth/token
      window.location.href = endpoint.url;
    }
  };

  return checkAuth ? (
    <div>
      <h1>遊戲線上揪</h1>

      <div className="flex flex-col gap-4">
        <Button
          component="a"
          href={`${internalEndpoint}/login?type=${LoginType.GOOGLE}`}
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={(e: SyntheticEvent) => onLoginClick(e, LoginType.GOOGLE)}
        >
          Google 登入
        </Button>
        <Button
          component="a"
          href={`${internalEndpoint}/login?type=${LoginType.GITHUB}`}
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={(e: SyntheticEvent) => onLoginClick(e, LoginType.GITHUB)}
        >
          GitHub 登入
        </Button>
        <Button
          component="a"
          href={`${internalEndpoint}/login?type=${LoginType.LINKEDIN}`}
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={(e: SyntheticEvent) => onLoginClick(e, LoginType.LINKEDIN)}
        >
          LinkedIn 登入
        </Button>
        <Button
          component="a"
          href={`${internalEndpoint}/login?type=${LoginType.DISCORD}`}
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={(e: SyntheticEvent) => onLoginClick(e, LoginType.DISCORD)}
        >
          Discord 登入
        </Button>
      </div>
    </div>
  ) : (
    <></>
  );
};

Login.Anonymous = true;

export default Login;
