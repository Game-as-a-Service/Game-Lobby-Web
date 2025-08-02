import { FC, ReactNode, useState, useEffect, useCallback } from "react";
import {
  useGetUser,
  useAuthenticate,
  type GetUserViewModel as User,
} from "@/services/api";
import AuthContext from "./AuthContext";
import useCookie from "@/hooks/useCookie";

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 建構 JWT 參數用於 API 呼叫
  const jwtParams = token ? { principal: { tokenValue: token } } : null;

  // 使用 useGetUser hook 獲取當前用戶資訊
  const { data: userData, error: userError } = useGetUser({
    swr: {
      enabled: !!token,
      onError: (error: any) => {
        // 如果是認證錯誤，清除 token 和用戶資訊
        if (error?.status === 401) {
          setToken(null);
          setCurrentUser(null);
        }
      },
    },
  });

  // 當 API 返回用戶資料時更新 currentUser
  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    } else if (userError) {
      setCurrentUser(null);
    }
  }, [userData, userError]);

  // 當 token 被清除時，也清除用戶資訊
  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
    }
  }, [token]);

  const updateCurrentUser = (user: User | null) => {
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser: updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
