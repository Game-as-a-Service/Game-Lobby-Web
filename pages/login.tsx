import { LoginType, getLoginEndpoint } from "@/requests/auth/auth";
import Button from "@/shared/components/Button";
import useUser from "@/shared/hooks/useUser";
import { NextPageWithProps } from "./_app";
import { useEffect, useState } from "react";
import useAuth from "@/shared/hooks/context/useAuth";
import { useRouter } from "next/router";

const Login: NextPageWithProps = () => {
  const { getLoginEndpoint } = useUser();
  const { token } = useAuth();
  const { push } = useRouter();
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    if (token) {
      push("/");
    } else {
      setCheckAuth(true);
    }
  }, [token]);

  const onLoginClick = async (type: LoginType) => {
    const endpoint = await getLoginEndpoint(type);

    // mock: redirect to /auth/token
    window.location.href = endpoint.url;
  };

  return checkAuth ? (
    <div>
      <h1>遊戲線上揪</h1>

      <div className="flex flex-col gap-4">
        <Button
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={() => onLoginClick(LoginType.GOOGLE)}
        >
          Google 登入
        </Button>
        <Button
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={() => onLoginClick(LoginType.GITHUB)}
        >
          GitHub 登入
        </Button>
        <Button
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={() => onLoginClick(LoginType.LINKEDIN)}
        >
          LinkedIn 登入
        </Button>
        <Button
          className="bg-[#D4DAE8] text-[#1E1F22]"
          onClick={() => onLoginClick(LoginType.DISCORD)}
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
