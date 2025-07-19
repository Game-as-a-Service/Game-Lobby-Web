import { FC, ReactNode, useState } from "react";
import { UserInfo } from "@/requests/users";
import AuthContext from "./AuthContext";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUser,
        setCurrentUser: (currentUser: UserInfo | null) =>
          setCurrentUser((pre) =>
            currentUser ? { ...pre, ...currentUser } : null
          ),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
