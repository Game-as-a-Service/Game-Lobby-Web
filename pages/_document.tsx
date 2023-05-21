import { Html, Head, Main, NextScript } from "next/document"

export const siteTitle = "遊戲微服務大廳"

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="Game Lobby" content="Game Lobby" />
        {/* <meta property="og:image" /> */}
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
