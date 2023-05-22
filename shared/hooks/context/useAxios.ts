import { useContext } from "react"

import AxiosContext from "@/shared/contexts/AxiosContext"

const useAxios = () => {
  return useContext(AxiosContext)
}

export default useAxios
