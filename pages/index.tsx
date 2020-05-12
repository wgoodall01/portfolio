import Head from "next/head";
import { Card, Nav } from "../components/Common";
import HeroVideo from "../components/HeroVideo";
import { StripeLayout, Container } from "../components/Layouts";
import Link from "next/link";
import css from "styled-jsx/css";

export default function Index() {
  return (
    <StripeLayout thick>
      <Container center>
        <h1>William Goodall</h1>
        <Nav hideBrand />
      </Container>
    </StripeLayout>
  );
}
