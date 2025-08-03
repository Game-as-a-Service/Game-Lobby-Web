import { useContext, useState, useCallback } from "react";
import AuthContext from "./AuthContext";
import {
  useGetUser,
  useUpdateUser as useUpdateUserMutation,
  useAuthenticate,
  login,
  type GetUserViewModel as User,
  type UpdateUserRequest,
  type LoginParams,
  type AuthenticateToken,
} from "@/services/api";
import { ApiError } from "@/services/api/fetcher";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

/**
 * 獲取當前用戶資訊
 */
export const useCurrentUser = () => {
  const { currentUser } = useAuth();
  const { token } = useAuth();

  const { data: userData, error: userError } = useGetUser({
    swr: {
      enabled: !!token,
    },
  });

  return {
    currentUser: userData || currentUser,
    error: userError,
    isLoading: !userData && !userError && !!token,
  };
};

/**
 * 更新用戶資訊
 */
export const useUpdateUser = () => {
  const { token } = useAuth();
  const { trigger, isMutating, error } = useUpdateUserMutation();

  const updateUser = useCallback(
    async (data: UpdateUserRequest) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        const result = await trigger({
          updateUserRequest: data,
        });
        return result;
      } catch (err) {
        throw err;
      }
    },
    [token, trigger]
  );

  return {
    updateUser,
    isLoading: isMutating,
    error,
  };
};

/**
 * 獲取第三方登入 URL
 */
export const useGetLoginUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(async (params: LoginParams) => {
    try {
      setIsLoading(true);
      setError(null);
      // 使用直接調用方式而不是 hook
      const result = await login(params);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trigger,
    isLoading,
    error,
  };
};

/**
 * 獲取 Mock Token
 * Note: 這個功能需要根據實際 API 調整
 */
export const useGetMockToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      // 這裡需要根據實際的 Mock Token API 來實作
      // 暫時返回一個模擬的 token
      const mockToken = "mock-jwt-token";
      return { token: mockToken };
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    trigger,
    isLoading,
    error,
  };
};
/**
 * 認證 token
 */
export const useAuthenticateToken = () => {
  const { trigger, isMutating, error } = useAuthenticate();

  const authenticate = useCallback(
    async (token: string) => {
      try {
        const result = await trigger({ token });
        return result;
      } catch (err) {
        throw err;
      }
    },
    [trigger]
  );

  return {
    authenticate,
    isLoading: isMutating,
    error,
  };
};

/**
 * 登出
 */
export const useLogout = () => {
  const { setToken, setCurrentUser } = useAuth();

  const logout = useCallback(async () => {
    setToken(null);
    setCurrentUser(null);
  }, [setToken, setCurrentUser]);

  return { logout };
};
