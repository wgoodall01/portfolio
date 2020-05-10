import Link from "next/link";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface DisplayProps {
  overlap?: string;
  hang?: string;
  opacity?: number;
}

export function Display({
  children,
  className
}: ContainerProps & DisplayProps) {
  return (
    <h1 className={className}>
      <style jsx>{`
        h1 {
          display: block;
          position: relative;

          font-size: 3rem;

          paddding: 2rem 1rem;

          margin-top: 2rem;
        }
      `}</style>
      {children}
    </h1>
  );
}

export function Shade({ children, className }: ContainerProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          opacity: 0.5;
        }
      `}</style>
      {children}
    </div>
  );
}

export interface CardProps {
  pad?: string;
}

export function Card({
  children,
  className,
  pad = "0.5rem"
}: ContainerProps & CardProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          padding: ${pad};
          background-color: var(--color-shade);
          margin-bottom: 1rem;
        }
      `}</style>

      {children}
    </div>
  );
}

interface HBoxProps {
  // Separation between elements, in rem.
  sep?: number;
}

export function HBox({
  children,
  className,
  sep = 1
}: ContainerProps & HBoxProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-right: calc(-1 * ${sep}rem);
        }

        div > :global(*) {
          margin-right: ${sep}rem;
        }
      `}</style>
      {children}
    </div>
  );
}

export interface NavProps {
  // If set, hide the name
  hideBrand?: boolean;
}

export function Nav({ hideBrand = false }: NavProps) {
  return (
    <nav>
      <style jsx>{`
        nav {
          margin-bottom: 1rem;
        }

        .brand {
          margin-right: auto;

          text-decoration: none;
          font-size: 1.2rem;
        }
      `}</style>
      <HBox>
        {!hideBrand && (
          <Link href="/">
            <a className="brand">William Goodall</a>
          </Link>
        )}
        <HBox>
          <Link href="/projects">
            <a>Projects</a>
          </Link>
          <Link href="/photography">
            <a>Photography</a>
          </Link>
          <Link href="/resume">
            <a>Resume</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </HBox>
      </HBox>
    </nav>
  );
}
