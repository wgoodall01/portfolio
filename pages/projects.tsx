import { Display, Nav } from "../components/Common";
import { StripeLayout, Container } from "../components/Layouts";

export default function Projects() {
  return (
    <StripeLayout>
      <Container>
        <Nav />
        <Display>Projects</Display>
        <p>Some paragraph of text goes here.</p>
      </Container>
    </StripeLayout>
  );
}
