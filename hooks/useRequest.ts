import { useMemo } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";

import { IRequestWrapper } from "@/requests/request";
import useAxios from "./context/useAxios";
import useAuth from "./context/useAuth";
import useHistory from "./context/useHistory";
import { Status } from "@/contexts/HistoryContext";
import {
  useToast,
  UseToastComponent,
  UseToastOptions,
} from "@/components/shared/Toast";
import { getEnv, Env } from "@/lib/env";

interface FetchOptions {
  toast?: {
    show?: boolean;
    component?: UseToastComponent;
    options?: UseToastOptions;
  };
}

const useRequest = () => {
  const { axios } = useAxios();
  const { token, setToken: setTokenCtx } = useAuth();
  const { addApiHistory, updateApiHistory } = useHistory();
  const toast = useToast();
  const isProduction = getEnv().env !== Env.PROD ? false : true;

  const fetch = useMemo(
    () =>
      <T>(
        requestWrapper: IRequestWrapper<T>,
        options: FetchOptions = {
          toast: {
            show: false,
            options: {
              position: "bottom-right",
            },
          },
        }
      ) => {
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
        addApiHistory(history);

        return requestWrapper
          .executor(axios, additionalToRequest)
          .then((res) => {
            if (!isProduction) {
              updateApiHistory({
                ...history,
                status: Status.RESOLVED,
                statusCode: res.status,
                response: res.data,
                time: new Date().getTime() - startTime,
              });
            }

            if (options.toast?.show) {
              toast(
                options?.toast?.component || {
                  state: "success",
                  children: "success!",
                },
                options?.toast?.options
              );
            }
            return res.data;
          })
          .catch((err: AxiosError) => {
            if (err?.response?.status === 401) {
              // the same handling like useUser.logout()
              setTokenCtx(null);
            }
            throw err;
          })
          .catch((err: Error) => {
            if (!isProduction) {
              updateApiHistory({
                ...history,
                status: Status.REJECTED,
                time: new Date().getTime() - startTime,
                error: err,
              });
            }

            if (options.toast?.show) {
              toast(
                options?.toast?.component || {
                  state: "error",
                  children: "error!",
                },
                options?.toast?.options
              );
            }
            throw err;
          });
      },
    [axios, token]
  );

  return { fetch };
};

export default useRequest;
