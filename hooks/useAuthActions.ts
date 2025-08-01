import { useCallback } from "react";
import {
  useAuth,
  useGetLoginUrl,
  useGetMockToken,
  useLogout,
} from "@/contexts/auth";
import { authApi } from "@/api";
import useCookie from "./useCookie";
import type { LoginRequest } from "@/api";

const useAuthActions = () => {
  const { setToken: setTokenCtx } = useAuth();
  const { tokenOperator } = useCookie();

  const { trigger: getLoginUrlTrigger } = useGetLoginUrl();
  const { trigger: getMockTokenTrigger } = useGetMockToken();
  const { logout: logoutAction } = useLogout();

  const getLoginEndpoint = useCallback(
    async (type: LoginRequest["type"]) => {
      return await getLoginUrlTrigger({ type });
    },
    [getLoginUrlTrigger]
  );

  const getMockToken = useCallback(async () => {
    return await getMockTokenTrigger();
  }, [getMockTokenTrigger]);

  const authentication = useCallback(async (token: string) => {
    return await authApi.authenticate({ token });
  }, []);

  const login = useCallback(
    (token: string) => {
      setTokenCtx(token);
    },
    [setTokenCtx]
  );

  const logout = useCallback(async () => {
    await logoutAction();
  }, [logoutAction]);

  const getTokenInCookie = useCallback(() => {
    return tokenOperator.get();
  }, [tokenOperator]);

  const updateTokenInCookie = useCallback(
    (token?: string) => {
      if (token) {
        tokenOperator.set(token);
      } else {
        tokenOperator.remove();
      }
    },
    [tokenOperator]
  );

  return {
    getLoginEndpoint,
    getMockToken,
    authentication,
    login,
    logout,
    getTokenInCookie,
    updateTokenInCookie,
  };
};

export default useAuthActions;
