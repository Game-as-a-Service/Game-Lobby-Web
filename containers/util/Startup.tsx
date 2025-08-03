import { FC, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useAuth, useCurrentUser } from "@/contexts/auth";
import useAuthActions from "@/hooks/useAuthActions";

type Props = {
  isAnonymous: boolean;
  children: ReactNode;
};

const Startup: FC<Props> = ({ children, isAnonymous }) => {
  const { token, setToken, setCurrentUser } = useAuth();
  const { getTokenInCookie, updateTokenInCookie } = useAuthActions();
  const { currentUser } = useCurrentUser();
  const { push } = useRouter();
  const [pageDone, setPageDone] = useState(false);

  useEffect(() => {
    async function fetch() {
      const jwt = getTokenInCookie();
      if (jwt) {
        setToken(jwt);
      } else {
        setToken(null);
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    if (token === null) {
      updateTokenInCookie(null);
      setCurrentUser(null);
    } else if (token === undefined) {
    } else {
      updateTokenInCookie(token);
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    }
  }, [token, currentUser]);

  useEffect(() => {
    if (token === null && !isAnonymous) {
      push("/login");
    } else if (token && currentUser) {
      setPageDone(true);
    } else if (isAnonymous) {
      setPageDone(true);
    }
  }, [token, currentUser, isAnonymous, push]);

  return pageDone ? <>{children}</> : <></>;
};

export default Startup;
