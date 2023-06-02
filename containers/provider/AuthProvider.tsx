import { FC, ReactNode, useState } from "react";
import { UserInfo } from "@/requests/users";
import AuthContext from "@/contexts/AuthContext";

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
        setToken: (token: string | undefined | null) => setToken(token),
        currentUser,
        setCurrentUser: (currentUser: UserInfo | null) =>
          setCurrentUser(currentUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
