import { FC, ReactNode, useState, useEffect } from "react";
import useSWR from "swr";
import { SWRConfig } from "swr";
import {
  createApiFetcher,
  userKeys,
  authApi,
  usersApi,
  isAuthError,
} from "@/api";
import type { User } from "@/api";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();

  // 創建 SWR fetcher
  const fetcher = createApiFetcher(token);

  // 使用 SWR 獲取當前用戶資訊
  const {
    data: currentUser,
    error,
    mutate: mutateCurrentUser,
  } = useSWR<User>(token ? userKeys.current() : null, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: (error) => !isAuthError(error),
  });

  // 當有認證錯誤時，清除 token
  useEffect(() => {
    if (error && isAuthError(error)) {
      setToken(null);
    }
  }, [error]);

  const setCurrentUser = (user: User | null) => {
    mutateCurrentUser(user || undefined, false);
  };

  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: (error) => !isAuthError(error),
      }}
    >
      <AuthContext.Provider
        value={{
          token,
          setToken,
          currentUser: currentUser || null,
          setCurrentUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SWRConfig>
  );
};

export default AuthProvider;
