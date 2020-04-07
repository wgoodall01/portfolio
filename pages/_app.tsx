import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "typeface-catamaran";
import "typeface-merriweather";

const globalCss = `
  html {
    font-family: "Merriweather";
    box-sizing: border-box;

    --color-primary: black;
    --content-width: 50rem;
  }

  body {
    margin: 0;
    padding: 0;

    color: #222;
  }

  * {
    box-sizing: inherit;
  }

  a:hover {
    color: white;
    background-color: var(--color-primary);
    outline: 0.3rem solid var(--color-primary);
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Catamaran";
    font-weight: 900;
    margin-top: 0.5em;
    margin-bottom: 0em;

    color: var(--color-primary);
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>William Goodall</title>
      </Head>
      <Component {...pageProps} />
      <style dangerouslySetInnerHTML={{ __html: globalCss }} />
    </>
  );
}
