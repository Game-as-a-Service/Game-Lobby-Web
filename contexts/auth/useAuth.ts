import { useContext } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import AuthContext from "./AuthContext";
import {
  authApi,
  usersApi,
  userKeys,
  authKeys,
  isAuthError,
  type User,
  type LoginRequest,
  type UpdateUserRequest,
} from "@/api";

// ========================
// 基礎 Hook
// ========================

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// ========================
// SWR Hooks
// ========================

/**
 * 獲取當前用戶資訊
 */
export const useCurrentUser = () => {
  const { token } = useAuth();

  return useSWR<User>(token ? userKeys.current() : null, {
    revalidateOnFocus: false,
    shouldRetryOnError: (error) => !isAuthError(error),
  });
};

// ========================
// Mutation Hooks
// ========================

/**
 * 更新用戶資訊
 */
export const useUpdateUser = () => {
  const { token } = useAuth();

  return useSWRMutation(
    userKeys.current(),
    async (_key: readonly string[], { arg }: { arg: UpdateUserRequest }) => {
      if (!token) throw new Error("No token available");
      return usersApi.updateCurrentUser(token, arg);
    },
    {
      onSuccess: (data) => {
        // 更新 cache
        mutate(userKeys.current(), data, false);
      },
    }
  );
};

/**
 * 獲取第三方登入 URL
 */
export const useGetLoginUrl = () => {
  return useSWRMutation(
    authKeys.login(""),
    async (_key: readonly string[], { arg }: { arg: LoginRequest }) => {
      return authApi.getLoginUrl(arg);
    }
  );
};

/**
 * 獲取 Mock Token
 */
export const useGetMockToken = () => {
  return useSWRMutation(authKeys.token(), async () => {
    return authApi.getMockToken();
  });
};

/**
 * 登出
 */
export const useLogout = () => {
  const { setToken } = useAuth();

  const logout = async () => {
    // 清除 token
    setToken(null);

    // 清除所有相關的 cache
    mutate(
      (key) => Array.isArray(key) && (key[0] === "users" || key[0] === "rooms"),
      undefined,
      { revalidate: false }
    );
  };

  return { logout };
};
