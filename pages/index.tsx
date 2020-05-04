import Head from "next/head";
import { Card, Shade, Display, HBox } from "../components/Common";
import HeroVideo from "../components/HeroVideo";
import Link from "next/link";
import css from "styled-jsx/css";
export default function Index() {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;

          display: flex;
          flex-direction: row;
          align-items: stretch;
          flex-wrap: wrap;
        }

        .video {
          flex: 2;
          flex-basis: 10rem;

          display: flex;
          overflow: hidden;
        }

        .content {
          flex: 3;
          flex-basis: 30rem;

          padding: 3rem;

          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      `}</style>

      <div className="video">
        <HeroVideo />
      </div>

      <div className="content">
        <Display>William Goodall</Display>
        <HBox>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
          <Link href="/photography">
            <a>Photography</a>
          </Link>
          <a href="/WilliamGoodall.pdf">Resume</a>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </HBox>
      </div>
    </div>
  );
}
