import Head from "next/head";
import { Card, Display, Nav } from "../components/Common";
import HeroVideo from "../components/HeroVideo";
import { StripeLayout, Container } from "../components/Layouts";
import Link from "next/link";
import css from "styled-jsx/css";

export default function Index() {
  return (
    <StripeLayout thick>
      <Container center>
        <Display>William Goodall</Display>
        <Nav hideBrand />
      </Container>
    </StripeLayout>
  );
}
