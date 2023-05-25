import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import "@/styles/reset.css";
import "@/styles/global.css";

import AxiosProvider from "@/shared/containers/provider/AxiosProvider";
import AppLayout from "@/shared/containers/layout/AppLayout";
import ModalManager from "@/shared/components/Modal/ModalManager";
import { CtxToastQueueProvider } from "@/shared/components/Toast/CtxToastQueue";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

export default function App({ Component, pageProps }: AppWithProps) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  return (
    <ModalManager.Provider>
      <CtxToastQueueProvider>
        <AxiosProvider>
          {getLayout(<Component {...pageProps} />)}{" "}
        </AxiosProvider>
      </CtxToastQueueProvider>
    </ModalManager.Provider>
  );
}
