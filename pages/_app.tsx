import { AppProps } from "next/app";
import Layout from "@/shared/components/layout";
import "@/styles/reset.css";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
