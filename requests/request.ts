import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface IRequestWrapper<T> {
  executor: (
    axiosInstance: AxiosInstance,
    additionalToRequest?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  url: string;
  method: HttpMethod;
  additional?: {
    isPublic?: boolean;
  };
}

export const requestWrapper = <T>(
  config: AxiosRequestConfig & {
    url: string;
    method: HttpMethod;
  },
  additional?: {
    isPublic?: boolean;
  }
): IRequestWrapper<T> => {
  return {
    executor: (
      axiosInstance: AxiosInstance,
      additionalToRequest?: AxiosRequestConfig
    ) => {
      return axiosInstance.request({ ...config, ...additionalToRequest });
    },
    url: config.url,
    method: config.method,
    additional,
  };
};
