import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

type HttpMethod = "GET" | "POST"

export interface IRequestWrapper<T> {
  executor: (
    axiosInstance: AxiosInstance,
    additionalToRequest?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>
  url: string
  method: string
  additional?: {
    isPublic?: boolean
  }
}

export const requestWrapper = <T>(
  config: AxiosRequestConfig & {
    url: string
    method: HttpMethod
  },
  additional?: {
    isPublic?: boolean
  }
): IRequestWrapper<T> => {
  return {
    executor: (
      axiosInstance: AxiosInstance,
      additionalToRequest?: AxiosRequestConfig
    ) => {
      return axiosInstance.request({ ...config, ...additionalToRequest })
    },
    url: config.url,
    method: config.method,
    additional,
  }
}
