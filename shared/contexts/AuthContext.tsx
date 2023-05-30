import { createContext } from "react";

import { UserInfo } from "@/requests/users";

interface IAuthContext {
  token: string | null | undefined;
  setToken: (token: string | null | undefined) => unknown;
  currentUser: UserInfo | null;
  setCurrentUser: (user: UserInfo | null) => unknown;
}

const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => null,
  currentUser: null,
  setCurrentUser: () => null,
});

export default AuthContext;
