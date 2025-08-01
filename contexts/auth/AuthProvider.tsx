import { FC, ReactNode, useState, useEffect, useCallback } from "react";
import { authApi, usersApi, isAuthError } from "@/api";
import type { User } from "@/api";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // 獲取當前用戶資訊
  const fetchCurrentUser = useCallback(async (authToken: string) => {
    try {
      setLoading(true);
      const user = await usersApi.getCurrentUser(authToken);
      setCurrentUser(user);
    } catch (error) {
      if (isAuthError(error)) {
        setToken(null);
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // 當 token 改變時獲取用戶資訊
  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    } else {
      setCurrentUser(null);
    }
  }, [token, fetchCurrentUser]);

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
