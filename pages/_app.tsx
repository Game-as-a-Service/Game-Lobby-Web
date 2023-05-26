import { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import "@/styles/reset.css";
import "@/styles/global.css";

import AxiosProvider from "@/shared/containers/provider/AxiosProvider";
import AppLayout from "@/shared/containers/layout/AppLayout";
import ModalManager from "@/shared/components/Modal/ModalManager";
import AuthProvider from "@/shared/containers/provider/AuthProvider";
import Startup from "@/shared/containers/util/Startup";

export type NextPageWithProps<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  Anonymous?: boolean;
};

type AppWithProps = AppProps & {
  Component: NextPageWithProps;
};

export default function App({ Component, pageProps }: AppWithProps) {
  const isAnonymous = Component.Anonymous || false;

  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <AppLayout>{page}</AppLayout>);

  return (
    <ModalManager.Provider>
      <AxiosProvider>
        <AuthProvider>
          <Startup isAnonymous={isAnonymous}>
            {getLayout(<Component {...pageProps} />)}
          </Startup>
        </AuthProvider>
      </AxiosProvider>
    </ModalManager.Provider>
  );
}
