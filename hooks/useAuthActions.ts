import { useCallback } from "react";
import {
  useAuth,
  useGetLoginUrl,
  useGetMockToken,
  useLogout,
} from "@/contexts/auth";
import { authApi } from "@/api";
import useSWRMutation from "swr/mutation";
import { authKeys } from "@/api";
import useCookie from "./useCookie";
import type { LoginRequest } from "@/api";

const useAuthActions = () => {
  const { setToken: setTokenCtx } = useAuth();
  const { tokenOperator } = useCookie();

  // SWR hooks
  const { trigger: getLoginUrlTrigger } = useGetLoginUrl();
  const { trigger: getMockTokenTrigger } = useGetMockToken();
  const { logout: logoutAction } = useLogout();

  // Authentication mutation
  const { trigger: authenticateToken } = useSWRMutation(
    authKeys.authenticate(),
    async (_key: readonly string[], { arg }: { arg: { token: string } }) => {
      return authApi.authenticate(arg);
    }
  );

  // Action functions
  const getLoginEndpoint = useCallback(
    async (type: LoginRequest["type"]) => {
      return await getLoginUrlTrigger({ type });
    },
    [getLoginUrlTrigger]
  );

  const getMockToken = useCallback(async () => {
    return await getMockTokenTrigger();
  }, [getMockTokenTrigger]);

  const authentication = useCallback(
    async (token: string) => {
      return await authenticateToken({ token });
    },
    [authenticateToken]
  );

  const login = useCallback(
    (token: string) => {
      setTokenCtx(token);
    },
    [setTokenCtx]
  );

  const logout = useCallback(async () => {
    await logoutAction();
  }, [logoutAction]);

  // Token cookie operations
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
