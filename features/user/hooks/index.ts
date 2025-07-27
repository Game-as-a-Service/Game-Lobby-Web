/**
 * Users SWR Hooks
 */

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { usersApi, userKeys, type User, type UpdateUserRequest } from "@/api";
import { useAuth } from "@/contexts/auth";

// ========================
// SWR Hooks
// ========================

/**
 * 獲取用戶檔案
 */
export const useUserProfile = (userId: string | null) => {
  const { token } = useAuth();

  return useSWR<User>(token && userId ? userKeys.profile(userId) : null, {
    revalidateOnFocus: false,
  });
};

// ========================
// Mutation Hooks
// ========================

/**
 * 更新用戶資訊 (重新導出，保持一致性)
 */
export { useUpdateUser } from "@/contexts/auth/useAuth";
