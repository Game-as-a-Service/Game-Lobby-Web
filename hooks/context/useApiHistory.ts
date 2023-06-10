import ApiHistoryContext from "@/contexts/ApiHistoryContext";
import { useContext } from "react";

const useApiHistory = () => {
  return useContext(ApiHistoryContext);
};

export default useApiHistory;
