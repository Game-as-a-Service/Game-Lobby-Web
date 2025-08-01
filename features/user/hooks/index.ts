/**
 * Users Hooks
 */

import { useState, useCallback, useEffect } from "react";
import { usersApi, type User, type UpdateUserRequest } from "@/api";
import { useAuth } from "@/contexts/auth";

/**
 * 獲取用戶檔案
 */
export const useUserProfile = (userId: string | null) => {
  const { token } = useAuth();
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!!userId && !!token);

  const fetchUserProfile = useCallback(
    async (id: string, authToken: string) => {
      try {
        setIsLoading(true);
        setError(null);
        // Note: 目前的 API 只有 getCurrentUser，如果需要其他用戶的資料需要新的端點
        const result = await usersApi.getCurrentUser(authToken);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (userId && token) {
      fetchUserProfile(userId, token);
    } else {
      setData(null);
      setIsLoading(false);
    }
  }, [userId, token, fetchUserProfile]);

  return {
    data,
    error,
    isLoading,
    refetch:
      userId && token ? () => fetchUserProfile(userId, token) : undefined,
  };
};

/**
 * 更新用戶資訊 (重新導出，保持一致性)
 */
export { useUpdateUser } from "@/contexts/auth/useAuth";
