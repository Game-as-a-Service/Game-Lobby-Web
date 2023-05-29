import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

import { NextPageWithProps } from "@/pages/_app";
import useUser from "@/shared/hooks/useUser";

const Token: NextPageWithProps = () => {
  const {
    query: { token },
    push,
  } = useRouter();
  const { login } = useUser();

  useEffect(() => {
    if (token) {
      login(token as string);
      push("/");
    }
  }, [token, login, push]);

  return <h1>{token}</h1>;
};

Token.getLayout = (page: ReactElement) => page;

export default Token;
