import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { appWithTranslation } from "next-i18next";

import "@/styles/reset.css";
import "@/styles/global.css";
import "@/scripts/whyDidYouRender";

import AxiosProvider from "@/containers/provider/AxiosProvider";
import AppLayout from "@/containers/layout/AppLayout";
import AuthProvider from "@/containers/provider/AuthProvider";
import Startup from "@/containers/util/Startup";
import ApiHistoryProvider from "@/containers/provider/ApiHistoryProvider";
import ApiHistoryList from "@/components/util/api-history/ApiHistoryList";
import { Env, getEnv } from "@/lib/env";
import { ToastQueueProvider } from "@/components/shared/Toast";
import ChatroomContextProvider from "@/containers/provider/ChatroomProvider";
import { SocketProvider } from "../containers/provider/SocketProvider";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  Anonymous?: boolean;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

function App({ Component, pageProps }: AppWithProps) {
  const { env } = getEnv();
  const isAnonymous =
    Component.Anonymous || !!process.env.NEXT_PUBLIC_CI_MODE || false;
  const isProduction = env !== Env.PROD ? false : true;

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
    <ToastQueueProvider>
      <AxiosProvider>
        <AuthProvider>
          <SocketProvider>
            <ChatroomContextProvider>
              {getHistory(
                <Startup isAnonymous={isAnonymous}>
                  {getLayout(<Component {...pageProps} />)}
                  {!isProduction && <ApiHistoryList />}
                </Startup>
              )}
            </ChatroomContextProvider>
          </SocketProvider>
        </AuthProvider>
      </AxiosProvider>
    </ToastQueueProvider>
  );
}

export default appWithTranslation(App);
