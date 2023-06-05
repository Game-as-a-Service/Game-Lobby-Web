import { useMemo } from "react";
import { AxiosRequestConfig } from "axios";

import { IRequestWrapper } from "@/requests/request";
import useAxios from "./context/useAxios";
import useAuth from "./context/useAuth";

const useRequest = () => {
  const { axios } = useAxios();
  const { token, setToken: setTokenCtx } = useAuth();

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: IRequestWrapper<T>) => {
        const additionalToRequest: AxiosRequestConfig = {};

        if (!requestWrapper.additional?.isPublic) {
          additionalToRequest.headers = { Authorization: `Bearer ${token}` };
        }
        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => res.data)
          .catch((err) => {
            // the same handling like useUser.logout()
            setTokenCtx(null);
            throw err;
          });
      },
    [axios, token]
  );

  return { fetch };
};

export default useRequest;
