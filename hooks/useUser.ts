import {
  LoginType,
  getLoginEndpoint as getLoginEndpointReq,
  getMockToken as getMockTokenReq,
  authentication as authenticationReq,
} from "@/requests/auth";
import { getCurrentUser as getCurrentUserReq } from "@/requests/users/index";
import useRequest from "./useRequest";
import useAuth from "./context/useAuth";
import useCookie from "./useCookie";
import { useCallback } from "react";

const useUser = () => {
  const { fetch } = useRequest();
  const { setToken: setTokenCtx } = useAuth();
  const { tokenOperator, roomIdOperator, gameUrlOperator } = useCookie();

  const getLoginEndpoint = async (type: LoginType) => {
    return await fetch(getLoginEndpointReq(type));
  };

  const getMockToken = async () => {
    return await fetch(getMockTokenReq());
  };

  const authentication = async (token: string) => {
    return await fetch(authenticationReq(token));
  };

  const login = useCallback(
    (token: string) => {
      setTokenCtx(token);
    },
    [setTokenCtx]
  );

  const logout = useCallback(() => {
    setTokenCtx(null);
  }, [setTokenCtx]);

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

  const getCurrentUser = async () => {
    return await fetch(getCurrentUserReq());
  };

  const getRoomId = () => {
    return roomIdOperator.get();
  };

  const updateRoomId = useCallback(
    (roomId?: string) => {
      if (roomId) {
        roomIdOperator.set(roomId);
      } else {
        roomIdOperator.remove();
      }
    },
    [roomIdOperator]
  );

  const getGameUrl = () => {
    return gameUrlOperator.get() || "";
  };

  const updateGameUrl = useCallback(
    (gameUrl?: string) => {
      if (gameUrl) {
        gameUrlOperator.set(gameUrl);
      } else {
        gameUrlOperator.remove();
      }
    },
    [gameUrlOperator]
  );

  return {
    getLoginEndpoint,
    getMockToken,
    authentication,
    login,
    logout,
    getTokenInCookie,
    updateTokenInCookie,
    getCurrentUser,
    getRoomId,
    updateRoomId,
    getGameUrl,
    updateGameUrl,
  };
};

export default useUser;
