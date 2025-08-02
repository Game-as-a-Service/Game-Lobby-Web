import { AppProps } from "next/app";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import "@/styles/reset.css";
import "@/styles/global.css";
import "@/scripts/whyDidYouRender";

import getAppLayout from "@/containers/layout/AppLayout";
import { AuthProvider } from "@/contexts/auth";
import { SocketProvider } from "@/contexts/socket";
import { ChatroomProvider } from "@/contexts/chatroom";
import Startup from "@/containers/util/Startup";
import SWRConfigProvider from "@/containers/util/SWRConfigProvider";
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

  return (
    <>
      <Head>
        <title>遊戲微服務大平台</title>
      </Head>
      <ToastQueueProvider>
        <AuthProvider>
          <SWRConfigProvider>
            <SocketProvider>
              <ChatroomProvider>
                <Startup isAnonymous={isAnonymous}>
                  {getLayout(<Component {...pageProps} />)}
                </Startup>
              </ChatroomProvider>
            </SocketProvider>
          </SWRConfigProvider>
        </AuthProvider>
      </ToastQueueProvider>
    </>
  );
}

export default appWithTranslation(App);
