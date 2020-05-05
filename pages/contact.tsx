import { useRef } from "react";
import { Display, Nav, HBox, Card } from "../components/Common";
import { StripeLayout, Container } from "../components/Layouts";
import useHover from "../lib/useHover";
import Head from "next/head";
import { mangle, unmangle } from "../lib/mangle";
import HIDDEN from "../HIDDEN";

function Address({
  name,
  val,
  mangled
}: {
  name: string;
  val?: string;
  mangled?: string;
}) {
  const [hoverRef, isHover] = useHover<HTMLDivElement>();
  const dataRef = useRef<HTMLPreElement>();

  const whenHidden = mangled || mangle(val);
  const whenVisible = val || unmangle(mangled);

  const copy = () => {
    window.navigator.clipboard.writeText(whenVisible);
    alert("Copied!");
  };

  return (
    <div ref={hoverRef}>
      <style jsx>{`
        div {
          max-width: 25rem;
          margin-bottom: 1rem;
          background-color: rgba(0, 0, 0, 0.05);
          height: 2rem;
          line-height: 2rem;
          padding: 0 0.5rem;

          display: flex;
          flex-direction: row;
          align-items: center;
        }

        span {
          margin-right: auto;
        }

        button {
          margin-left: 0.5rem;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          padding: 0;
          background: none;
          border: none;
        }
      `}</style>

      <span>{name}</span>
      <pre ref={dataRef}>{isHover ? whenVisible : whenHidden}</pre>
      <button onClick={copy}>📋</button>
    </div>
  );
}

export default function Projects() {
  return (
    <StripeLayout>
      {/* Disable search engine indexing on this page. Anti-spam measure. */}
      <Head>
        <meta name="robots" content="none" />
      </Head>

      <Container>
        <Nav />
        <Display>Contact Me</Display>
        <p>Here are a few ways to reach me:</p>

        <Address name="Email" mangled={HIDDEN.email} />
        <Address name="Phone" mangled={HIDDEN.phone} />
        <Address name="Telegram" mangled={HIDDEN.telegram} />
        <Address name="Github" mangled={HIDDEN.github} />
        <Address name="LinkedIn" mangled={HIDDEN.linkedin} />
      </Container>
    </StripeLayout>
  );
}
