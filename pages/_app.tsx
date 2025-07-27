import { AppProps } from "next/app";
import { NextPage } from "next";
import { FC, PropsWithChildren, ReactElement } from "react";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import "@/styles/reset.css";
import "@/styles/global.css";
import "@/scripts/whyDidYouRender";

import getAppLayout from "@/containers/layout/AppLayout";
import { AuthProvider } from "@/contexts/auth";
import { HistoryProvider } from "@/contexts/history";
import { SocketProvider } from "@/contexts/socket";
import { ChatroomProvider } from "@/contexts/chatroom";
import Startup from "@/containers/util/Startup";
import HistoryList from "@/components/util/history/HistoryList";
import { Env, getEnv } from "@/lib/env";
import { ToastQueueProvider } from "@/components/shared/Toast";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
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

  const getLayout = Component.getLayout ?? getAppLayout;

  const getHistory = (children: ReactElement) => {
    return isProduction ? (
      children
    ) : (
      <HistoryProvider>{children}</HistoryProvider>
    );
  };

  return (
    <>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>
      <ToastQueueProvider>
        <AuthProvider>
          {getHistory(
            <SocketProvider>
              <ChatroomProvider>
                <Startup isAnonymous={isAnonymous}>
                  {getLayout(<Component {...pageProps} />)}
                  {!isProduction && <HistoryList />}
                </Startup>
              </ChatroomProvider>
            </SocketProvider>
          )}
        </AuthProvider>
      </ToastQueueProvider>
    </>
  );
}

export default appWithTranslation(App);
