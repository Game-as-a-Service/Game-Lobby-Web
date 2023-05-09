import { AppProps } from "next/app";

import "@/styles/reset.css";
import "@/styles/global.css";

import AxiosProvider from "@/shared/containers/provider/AxiosProvider";
import Layout from "@/shared/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AxiosProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AxiosProvider>
  );
}
