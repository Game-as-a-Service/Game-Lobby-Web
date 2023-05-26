import AuthContext from "@/shared/contexts/AuthContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null | undefined>();

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: (token: string | undefined | null) => setToken(token),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
