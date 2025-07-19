import HistoryContext from "./HistoryContext";
import { useContext } from "react";

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
