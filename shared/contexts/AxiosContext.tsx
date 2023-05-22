import axios from "axios"
import type { AxiosInstance } from "axios"
import { createContext } from "react"

interface IAxiosContext {
  axios: AxiosInstance
}

const AxiosContext = createContext<IAxiosContext>({
  axios: axios.create(),
})

export default AxiosContext
