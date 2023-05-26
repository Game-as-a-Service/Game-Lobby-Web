import { FC, ReactNode, useEffect, useState } from "react";

import useAuth from "@/shared/hooks/context/useAuth";
import useUser from "@/shared/hooks/useUser";
import { useRouter } from "next/router";

type Props = {
  isAnonymous: boolean;
  children: ReactNode;
};

const Startup: FC<Props> = ({ children, isAnonymous }) => {
  const { token, setToken } = useAuth();
  const { authentication, getTokenInCookie, updateTokenInCookie } = useUser();
  const { push } = useRouter();
  const [pageDone, setPageDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      const jwt = getTokenInCookie();
      if (jwt) {
        const res = await authentication();
        if (res.token) {
          setToken(res.token);
        }
      } else {
        setToken(null);
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    if (token === null) {
      updateTokenInCookie();
    } else if (token === undefined) {
    } else {
      updateTokenInCookie(token);
    }
  }, [token]);

  useEffect(() => {
    if (token === null && !isAnonymous) {
      push("/login");
    } else if (token) {
      setPageDone(true);
    } else if (isAnonymous) {
      setPageDone(true);
    }
  }, [token, isAnonymous]);

  return pageDone ? <>{children}</> : <></>;
};

export default Startup;
