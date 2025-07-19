import AxiosContext from "./AxiosContext";
import { useContext } from "react";

const useAxios = () => {
  return useContext(AxiosContext);
};

export default useAxios;
