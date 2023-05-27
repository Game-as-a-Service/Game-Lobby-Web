import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import useAuth from "@/shared/hooks/context/useAuth";
import useUser from "@/shared/hooks/useUser";

type Props = {
  isAnonymous: boolean;
  children: ReactNode;
};

const Startup: FC<Props> = ({ children, isAnonymous }) => {
  const { token, setToken, setCurrentUser, currentUser } = useAuth();
  const {
    authentication,
    getTokenInCookie,
    updateTokenInCookie,
    getCurrentUser,
  } = useUser();
  const { push } = useRouter();
  const [pageDone, setPageDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      const jwt = getTokenInCookie();
      if (jwt) {
        const res = await authentication(jwt);
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
    async function fetch() {
      if (token === null) {
        updateTokenInCookie();
        setCurrentUser(null);
      } else if (token === undefined) {
      } else {
        updateTokenInCookie(token);
        const user = await getCurrentUser();
        setCurrentUser(user);
      }
    }

    fetch();
  }, [token]);

  useEffect(() => {
    if (token === null && !isAnonymous) {
      push("/login");
    } else if (token && currentUser) {
      setPageDone(true);
    } else if (isAnonymous) {
      setPageDone(true);
    }
  }, [token, currentUser, isAnonymous]);

  return pageDone ? <>{children}</> : <></>;
};

export default Startup;
