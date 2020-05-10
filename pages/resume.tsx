import { Display, Nav, Card, HBox, Shade } from "../components/Common";
import { StripeLayout, Container } from "../components/Layouts";
import { RiDownload2Line } from "react-icons/ri";

export default function Resume() {
  return (
    <StripeLayout>
      <Container>
        <Nav />
        <Display>Resume</Display>

        <Card pad="1.5rem">
          <div>Grab a copy:</div>
          <a href="/WilliamGoodall.pdf" rel="download">
            <RiDownload2Line style={{ marginRight: "0.5rem" }} />
            Download my resume (PDF)
          </a>
        </Card>
        <object data="/WilliamGoodall.pdf" width="100%" height="100%">
          <Shade>This browser doesn't support PDF preview.</Shade>
        </object>

        <style jsx>{`
          .inner {
            background-color: black;
          }

          .dafuq {
            background-color: red;
          }
        `}</style>
      </Container>
    </StripeLayout>
  );
}
