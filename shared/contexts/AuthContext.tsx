import { User } from "@/requests/auth/user";
import { createContext } from "react";

interface IAuthContext {
  token: string | null | undefined;
  setToken: (token: string | null | undefined) => unknown;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => unknown;
}

const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => null,
  currentUser: null,
  setCurrentUser: () => null,
});

export default AuthContext;
