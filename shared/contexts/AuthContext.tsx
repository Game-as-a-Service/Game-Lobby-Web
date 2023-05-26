import { createContext } from "react";

interface IAuthContext {
  token: string | null | undefined;
  setToken: (token: string | null | undefined) => unknown;
}

const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => null,
});

export default AuthContext;
