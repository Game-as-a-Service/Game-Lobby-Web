import { useMemo } from "react"
import { AxiosRequestConfig } from "axios"

import { IRequestWrapper } from "@/requests/request"
import useAxios from "./context/useAxios"

const useRequest = () => {
  const { axios } = useAxios()

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: IRequestWrapper<T>) => {
        const additionalToRequest: AxiosRequestConfig = {}
        if (!requestWrapper.additional?.isPublic) {
          //   additionalToRequest.headers = { Authorization: `Bearer ${jwtToken}` };
        }
        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => res.data)
      },
    [axios]
  )

  return { fetch }
}

export default useRequest
