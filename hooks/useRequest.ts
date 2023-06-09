import { useMemo } from "react";
import { AxiosRequestConfig } from "axios";

import { IRequestWrapper } from "@/requests/request";
import useAxios from "./context/useAxios";
import useAuth from "./context/useAuth";
import useApiHistory from "./context/useApiHistory";
import { Status } from "@/contexts/ApiHistoryContext";

const useRequest = () => {
  const { axios } = useAxios();
  const { token, setToken: setTokenCtx } = useAuth();
  const { addHistory, updateHistory } = useApiHistory();

  const fetch = useMemo(
    () =>
      <T>(requestWrapper: IRequestWrapper<T>) => {
        const additionalToRequest: AxiosRequestConfig = {};

        if (!requestWrapper.additional?.isPublic) {
          additionalToRequest.headers = { Authorization: `Bearer ${token}` };
        }

        const startTime = new Date().getTime();
        const history = {
          id: crypto.randomUUID(),
          url: requestWrapper.url,
          method: requestWrapper.method,
          status: Status.PENDING,
          time: 0,
        };
        addHistory(history);

        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => {
            updateHistory({
              ...history,
              status: Status.RESOLVED,
              statusCode: res.status,
              response: res.data,
              time: new Date().getTime() - startTime,
            });
            return res.data;
          })
          .catch((err) => {
            updateHistory({
              ...history,
              status: Status.REJECTED,
              time: new Date().getTime() - startTime,
              error: err,
            });
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
