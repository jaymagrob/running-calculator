import type { AppProps } from "next/app";
import Script from "next/script";
import TagManager from "react-gtm-module";
import { useEffect } from "react";
import Layout from "../components/layout";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-5D3WFXG" });
  }, []);

  return (
    <Layout>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-6809452858412935"
        async
        strategy="afterInteractive"
        onError={(e) => {
          // eslint-disable-next-line no-console
          console.error("Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Component {...pageProps} />
    </Layout>
  );
}
