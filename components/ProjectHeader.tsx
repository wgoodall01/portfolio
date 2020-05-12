import { Card } from "./Common";
import { RiExternalLinkLine } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";

export interface ProjectHeaderProps {
  name: string;
  tagline: string;
  liveUrl?: string;
  github?: [string, string]; // owner/repo
}

export default function ProjectHeader({
  liveUrl,
  github,
  name,
  tagline
}: ProjectHeaderProps) {
  return (
    <div className="container">
      <style jsx>{`
        .container {
          margin-bottom: 2rem;
        }

        h1 {
          margin-bottom: 1rem;
        }

        .tagline {
          margin: 1rem 0;
        }

        .link {
          display: inline-block;
          margin-right: 1em;
        }
      `}</style>

      <h1>{name}</h1>
      <div className="tagline">{tagline}</div>
      <Card>
        {liveUrl && (
          <a className="link" target="__blank" href={liveUrl}>
            <RiExternalLinkLine />
            {new URL(liveUrl).host}
          </a>
        )}
        {github && (
          <a
            className="link"
            target="__blank"
            href={`https://github.com/${github}`}
          >
            <IoLogoGithub />
            {github}
          </a>
        )}
      </Card>
    </div>
  );
}
