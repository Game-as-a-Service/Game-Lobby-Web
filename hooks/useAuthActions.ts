import { useCallback } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/auth";
import useCookie from "./useCookie";

const useAuthActions = () => {
  const { setToken, setCurrentUser } = useAuth();
  const { tokenOperator } = useCookie();
  const router = useRouter();

  const getTokenInCookie = useCallback(() => {
    return tokenOperator.get();
  }, [tokenOperator]);

  const updateTokenInCookie = useCallback(
    (token: string | null) => {
      if (token) {
        tokenOperator.set(token);
      } else {
        tokenOperator.remove();
      }
    },
    [tokenOperator]
  );

  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    tokenOperator.remove();
    router.push("/login");
  }, [setToken, setCurrentUser, tokenOperator, router]);

  const authentication = useCallback(
    async (token: string) => {
      setToken(token);
      updateTokenInCookie(token);
      return { token };
    },
    [setToken, updateTokenInCookie]
  );

  const login = useCallback(
    async (token: string) => {
      await authentication(token);
      router.push("/");
    },
    [authentication, router]
  );

  const getMockToken = useCallback(() => {
    return { token: "mock-jwt-token" };
  }, []);

  const getLoginEndpoint = useCallback((type?: string) => {
    return { url: "/api/mock/login" };
  }, []);

  return {
    getTokenInCookie,
    updateTokenInCookie,
    logout,
    authentication,
    login,
    getMockToken,
    getLoginEndpoint,
  };
};

export default useAuthActions;
