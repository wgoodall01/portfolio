import HeroVideo from "./HeroVideo";

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
          height: 100%;
          width: 100%;
          display: flex;

          --desktop-thin: 5rem;
          --desktop-thick: 40vw;

          --mobile-thin: 1rem;
          --mobile-thick: 30vh;
        }

        .stripe {
          display: flex;
        }

        .content {
          flex: 1;

          display: flex;
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
            display: hidden;
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
}

export function Container({ children, center = false }: ContainerProps) {
  return (
    <div className={center ? "is-centered" : ""}>
      <style jsx>{`
        div {
          flex: 1;
          max-width: 55rem;

          display: flex;
          flex-direction: column;

          padding: 3rem;
          margin-right: auto;
        }

        @media screen and (max-width: ${BREAKPOINT}) {
          div {
            padding: 1rem;
          }
        }

        .is-centered {
          justify-content: center;
        }
      `}</style>

      {children}
    </div>
  );
}
