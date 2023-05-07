import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export const siteTitle = "遊戲微服務大廳";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Game Lobby" content="Game Lobby" />
        {/* <meta property="og:image" /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header></Header>
      <main className="">
        <Sidebar />
        {children}
      </main>
      <Footer />
    </div>
  );
}
