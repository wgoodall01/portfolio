import HeroVideo from "./HeroVideo";
import { Nav } from "./Common";
import classNames from "classnames";

export interface SideVideoLayoutProps {
  children?: React.ReactNode;

  // Whether the side-stripe is display-sized or not.
  thick?: boolean;
}

const BREAKPOINT = "60rem";

export function StripeLayout({
  children,
  thick = false
}: SideVideoLayoutProps) {
  return (
    <div className={`container ${thick ? "is-thick" : ""}`}>
      <style jsx>{`
        .container {
          position: absolute;
          min-height: 100%;
          width: 100%;
          display: flex;

          --desktop-thin: 5rem;
          --desktop-thick: 40vw;

          --mobile-thin: 1rem;
          --mobile-thick: 60vh;
        }

        .stripe {
          display: flex;
        }

        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* responsive mobile breakpoint */
        @media screen and (max-width: ${BREAKPOINT}) {
          .container {
            flex-direction: column;
          }

          .stripe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            height: var(--mobile-thin);
          }

          .content {
            margin-top: var(--mobile-thin);
          }

          .is-thick .stripe {
            height: var(--mobile-thick);
          }

          .is-thick .content {
            margin-top: var(--mobile-thick);
          }
        }

        /* responsive desktop breakpoint */
        @media screen and (min-width: ${BREAKPOINT}) {
          .container {
            flex-direction: row;
          }

          .content {
            margin-left: var(--desktop-thin);
          }

          .stripe {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: var(--desktop-thin);
          }

          .is-thick .stripe {
            width: var(--desktop-thick);
          }

          .is-thick .content {
            margin-left: var(--desktop-thick);
          }
        }

        /* hide the video for print */
        @media print {
          .stripe {
            display: none;
          }
        }
      `}</style>

      <div className="stripe">
        <HeroVideo />{" "}
      </div>

      <div className="content">{children}</div>
    </div>
  );
}

export interface ContainerProps {
  children?: React.ReactNode;

  // Vertically center the Container's content.
  // The container expands with flex:1
  center?: boolean;

  // Expand to fill all available width
  wide?: boolean;
}

export function Container({
  children,
  center = false,
  wide = false
}: ContainerProps) {
  return (
    <div className={classNames({ "is-centered": center, "is-wide": wide })}>
      <style jsx>{`
        div {
          --pad: 3rem;

          width: 100%;
          max-width: 50rem;

          display: flex;
          flex-direction: column;

          padding: var(--pad);
          margin-right: auto;

          overflow-x: auto;
          overflow-y: visible;
        }

        /* If we're the last child, fill all available space in flex parent */
        div:last-child {
          flex: 1;
        }

        /* trim margin from vertically stacked Containers */
        div + div {
          margin-top: calc(-1 * var(--pad));
          padding-top: 0;
        }

        /* shrink padding on mobile */
        @media screen and (max-width: ${BREAKPOINT}) {
          div {
            --pad: 1rem;
          }
        }

        /* Expand and center content */
        .is-centered {
          flex: 1;
          justify-content: center;
        }

        /* Remove max-width to have a wide container */
        .is-wide {
          max-width: unset;
        }
      `}</style>

      {children}
    </div>
  );
}

export const PageLayout = ({ children }) => (
  <StripeLayout>
    <Container>
      <Nav />
    </Container>
    {children}
  </StripeLayout>
);

export const ProjectLayout = ({ children }) => (
  <PageLayout>
    <Container>
      {/* Wrap in a div so we're not a flex container---this brings back collapsing margins */}
      <div>{children}</div>
    </Container>
  </PageLayout>
);
