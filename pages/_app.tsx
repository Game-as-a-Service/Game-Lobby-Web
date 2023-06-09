import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import "@/styles/reset.css";
import "@/styles/global.css";

import AxiosProvider from "@/containers/provider/AxiosProvider";
import AppLayout from "@/containers/layout/AppLayout";
import ModalManager from "@/components/shared/Modal/ModalManager";
import AuthProvider from "@/containers/provider/AuthProvider";
import Startup from "@/containers/util/Startup";
import ApiHistoryProvider from "@/containers/provider/ApiHistoryProvider";
import ApiHistoryList from "@/components/util/api-history/ApiHistoryList";
import { Env, getEnv } from "@/lib/env";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  Anonymous?: boolean;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

export default function App({ Component, pageProps }: AppWithProps) {
  const isAnonymous = Component.Anonymous || false;
  const isProduction = getEnv().env !== Env.PROD ? false : true;

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  const getHistory = (children: ReactElement) => {
    return isProduction ? (
      children
    ) : (
      <ApiHistoryProvider>{children}</ApiHistoryProvider>
    );
  };

  return (
    <ModalManager.Provider>
      <AxiosProvider>
        <AuthProvider>
          {getHistory(
            <Startup isAnonymous={isAnonymous}>
              {getLayout(<Component {...pageProps} />)}
              {!isProduction && <ApiHistoryList />}
            </Startup>
          )}
        </AuthProvider>
      </AxiosProvider>
    </ModalManager.Provider>
  );
}
