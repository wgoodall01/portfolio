import { Nav, Card } from "../../components/Common";
import { StripeLayout, Container, PageLayout } from "../../components/Layouts";
import Link from "next/link";
import { GetStaticProps } from "next/types";
import { promises as fs } from "fs";
import path from "path";

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  github?: string; // e.g. "wgoodall01/portfolio"
  liveUrl?: string; // e.g. "https://williamgoodall.com"
}

export interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <Container>
      <style jsx>{`
        h2 {
          margin-top: 0;
        }
      `}</style>
      <h1>Projects</h1>
      {projects.map(project => (
        <Card key={project.slug}>
          <h2>
            <Link href={`/projects/${project.slug}`}>
              <a>{project.name}</a>
            </Link>
          </h2>
          <div>{project.tagline}</div>
        </Card>
      ))}
    </Container>
  );
}

Projects.title = "Projects";
Projects.layout = PageLayout;

export const getStaticProps: GetStaticProps = async () => {
  const slugs = (await fs.readdir(path.resolve("./pages/projects")))
    .filter(e => e.endsWith(".mdx"))
    .map(e => e.substring(0, e.length - 4));

  let projects = slugs.map(name => ({
    slug: name,
    ...require(`./${name}.mdx`).meta
  }));

  projects = projects.sort((a, b) => b.sortKey - a.sortKey);

  return {
    props: { projects }
  };
};
