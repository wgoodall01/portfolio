import { useState, useEffect } from "react";
import { Display, Nav, HBox, Card } from "../components/Common";
import { StripeLayout, Container } from "../components/Layouts";
import useHover from "../lib/useHover";
import Head from "next/head";

// mediocre obfuscation for my email address, in a futile attempt to stop spammers
const scrambledEmail =
  "V2tSS2EyUnRTWGxWYldocFVqTmtNMVJXVmtOaWJVcFlVbTVDYVZGNlZuRlpha2wzVUZFbE0wUWxNMFE9";
const atob = (str: string) => Buffer.from(str, "base64").toString("utf-8");
const email = atob(atob(atob(atob(scrambledEmail))));

function Address({
  name,
  val,
  href
}: {
  name: string;
  val?: string;
  href?: string;
}) {
  const copy = () => {
    window.navigator.clipboard.writeText(val);
    alert("Copied!");
  };

  return (
    <Card className="contact-address-card">
      <style jsx>{`
        :global(.contact-address-card) {
          max-width: 25rem;
          margin-bottom: 1rem;
        }

        span {
          margin-right: auto;
        }

        .copy {
          flex: 0;
          background: none;
          border: none;
          font-size: inherit;

          margin-left: 0.5rem;
          width: 1rem;
          text-align: center;

          transition: 0.1s;
          cursor: pointer;
        }

        .value {
          font-family: monospace;
        }

        .copy:hover {
          transform: scale(1.5) rotate(10deg);
        }
      `}</style>

      <HBox>
        <span>{name}</span>
        <div className="value">
          {href ? (
            <a href={href} target="__blank">
              {val}
            </a>
          ) : (
            val
          )}
        </div>
        <button className="copy" onClick={copy}>
          📋
        </button>
      </HBox>
    </Card>
  );
}

export function Info() {
  return (
    <>
      <p>Here are a few ways to reach me:</p>
      <Address name="Email" val={email} />
      <Address
        name="Telegram"
        val="@wgoodall01"
        href="https://t.me/wgoodall01"
      />

      <p>And here are my names around the web:</p>
      <Address
        name="Github"
        val="github.com/wgoodall01"
        href="https://github.com/wgoodall01"
      />
      <Address
        name="LinkedIn"
        val="linkedin.com/in/wgoodall01"
        href="https://linkedin.com/in/wgoodall01"
      />
    </>
  );
}

export default function Contact() {
  let [visible, setVisible] = useState(false);

  useEffect(() => {
    const tm = setTimeout(() => setVisible(true), 0);
    return () => clearTimeout(tm);
  });

  return (
    <StripeLayout>
      {/* Disable search engine indexing on this page. Anti-spam measure. */}
      <Head>
        <meta name="robots" content="none" />
      </Head>

      <Container>
        <Nav />
        <Display>Contact Me</Display>

        <noscript>
          <p>
            Sorry--You seem to have scripts turned off. For anti-spam purposes,
            please turn on JS.
          </p>
        </noscript>

        {visible ? <Info /> : <div>loading...</div>}
      </Container>
    </StripeLayout>
  );
}
