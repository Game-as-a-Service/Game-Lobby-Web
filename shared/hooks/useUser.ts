import {
  LoginType,
  getLoginEndpoint as getLoginEndpointReq,
  getMockToken as getMockTokenReq,
  authentication as authenticationReq,
} from "@/requests/auth/auth";
import useRequest from "./useRequest";
import useAuth from "./context/useAuth";
import useCookie from "./useCookie";

const useUser = () => {
  const { fetch } = useRequest();
  const { setToken: setTokenCtx } = useAuth();
  const { token: tokenOperator } = useCookie();

  const getLoginEndpoint = async (type: LoginType) => {
    return await fetch(getLoginEndpointReq(type));
  };

  const getMockToken = async () => {
    return await fetch(getMockTokenReq());
  };

  const authentication = async () => {
    return await fetch(authenticationReq());
  };

  const login = (token: string) => {
    setTokenCtx(token);
  };

  const logout = () => {
    setTokenCtx(null);
  };

  const getTokenInCookie = () => {
    return tokenOperator.get();
  };

  const updateTokenInCookie = (token?: string) => {
    if (token) {
      tokenOperator.set(token);
    } else {
      tokenOperator.remove();
    }
  };

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

export default useUser;
