import { NextPage } from "next";
import * as React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { IconContext } from "react-icons";

import "typeface-playfair-display";
import "typeface-source-serif-pro";
import "./global-styles.css";

export interface PageExt {
  title?: string;
  layout?: React.FunctionComponent;
}

const NoopLayout: React.FunctionComponent = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }: AppProps) {
  const Page = Component as NextPage & PageExt;

  // pull off extensions
  const title = Page.title;
  const Layout: React.FunctionComponent = Page.layout || NoopLayout;

  return (
    <>
      <Head>
        <title>
          {title ? `${title} | William Goodall` : "William Goodall"}
        </title>
      </Head>
      <IconContext.Provider
        value={{
          size: "16px",
          style: {
            marginTop: "-0.2rem",
            marginBottom: "-0.2rem",
            marginLeft: "0.2rem",
            marginRight: "0.2rem",
            verticalAlign: "middle"
          }
        }}
      >
        <Layout>
          <Page {...pageProps} />
        </Layout>
      </IconContext.Provider>
    </>
  );
}
