import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "typeface-playfair-display";
import "typeface-source-serif-pro";
import "./global-styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>William Goodall</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
