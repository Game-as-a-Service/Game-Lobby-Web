import { useContext, useState, useCallback } from "react";
import AuthContext from "./AuthContext";
import {
  authApi,
  usersApi,
  isAuthError,
  type User,
  type LoginRequest,
  type UpdateUserRequest,
} from "@/api";

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
  return {
    data: currentUser,
    error: null,
    isLoading: false,
  };
};

/**
 * 更新用戶資訊
 */
export const useUpdateUser = () => {
  const { token, setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateUser = useCallback(
    async (data: UpdateUserRequest) => {
      if (!token) {
        throw new Error("No token available");
      }

      try {
        setIsLoading(true);
        setError(null);
        const updatedUser = await usersApi.updateCurrentUser(token, data);
        setCurrentUser(updatedUser);
        return updatedUser;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [token, setCurrentUser]
  );

  return {
    updateUser,
    isLoading,
    error,
  };
};

/**
 * 獲取第三方登入 URL
 */
export const useGetLoginUrl = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(async (params: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await authApi.getLoginUrl(params);
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
 */
export const useGetMockToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const trigger = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await authApi.getMockToken();
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
