import Head from "next/head";
import { Card, Shade, Display, HBox } from "../components/Common";
import Link from "next/link";

export default function Index() {
  return (
    <div className="cover">
      <style jsx>{`
        .hero {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: -1;

          object-fit: cover;
          filter: brightness(70%);
        }

        .cover {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .center {
          max-width: var(--content-width);
        }
      `}</style>
      <video className="hero" src="/cover.webm" autoPlay loop muted />

      <div className="center">
        <Display overlap="3rem">William Goodall</Display>
        <Card>
          <p>
            Experienced and ethical developer, with a demonstrated history of
            working in the software industry. Skilled in full-stack web
            development in JavaScript/TypeScript, Go, and Python; mobile
            development in React-Native; proficient in Java, Rust, C, and C++.
            Pursuing a BS in Computer Science from the Georgia Institute of
            Technology.
          </p>
          <HBox>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
            <Link href="/photography">
              <a>Photography</a>
            </Link>
            <a href="/WilliamGoodall.pdf">Resume</a>
          </HBox>
        </Card>
      </div>
    </div>
  );
}
