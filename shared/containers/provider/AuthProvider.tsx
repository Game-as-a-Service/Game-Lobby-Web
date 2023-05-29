import { User } from "@/requests/auth/user";
import AuthContext from "@/shared/contexts/AuthContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (token: string | undefined | null) => setToken(token),
        currentUser,
        setCurrentUser: (currentUser: User | null) =>
          setCurrentUser(currentUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
