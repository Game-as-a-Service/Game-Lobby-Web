import AuthContext from "@/shared/contexts/AuthContext";
import { useContext } from "react";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
