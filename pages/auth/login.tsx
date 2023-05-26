import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

import { NextPageWithProps } from "../_app";
import useUser from "@/shared/hooks/useUser";

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

Login.getLayout = (page: ReactElement) => page;
Login.Anonymous = true;

export default Login;
