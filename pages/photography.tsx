import { Display, Nav } from "../components/Common";
import { StripeLayout, Container } from "../components/Layouts";

export default function Projects() {
  return (
    <StripeLayout>
      <Container>
        <Nav />
        <Display>Photography</Display>
        <p>Photography copy text something something goes here.</p>
      </Container>
    </StripeLayout>
  );
}
