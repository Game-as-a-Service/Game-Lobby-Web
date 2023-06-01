import { useContext } from "react";

import AxiosContext from "@/contexts/AxiosContext";

const useAxios = () => {
  return useContext(AxiosContext);
};

export default useAxios;
