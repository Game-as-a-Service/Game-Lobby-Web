import HistoryContext from "@/contexts/HistoryContext";
import { useContext } from "react";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
