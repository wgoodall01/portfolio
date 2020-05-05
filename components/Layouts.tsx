import HeroVideo from "./HeroVideo";

export interface SideVideoLayoutProps {
  children?: React.ReactNode;

  // Whether the side-stripe is display-sized or not.
  thick?: boolean;
}

export function StripeLayout({
  children,
  thick = false
}: SideVideoLayoutProps) {
  return (
    <div className={`container ${thick ? "is-thick" : ""}`}>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: stretch;
        }

        /* responsive mobile breakpoint */
        @media screen and (max-width: 50rem) {
          .container {
            flex-direction: column;
          }

          .stripe {
            flex-basis: 3rem;
          }

          .is-thick .stripe {
            flex-basis: 10rem;
          }
        }

        .is-thick .stripe {
          flex-basis: 40rem;
        }

        .stripe {
          flex-basis: 5rem;
          flex-grow: 0;

          display: flex;
        }

        .content {
          flex-basis: 30rem;
          flex-shrink: 0;
          flex-grow: 1;

          display: flex;
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

        .is-centered {
          justify-content: center;
        }
      `}</style>

      {children}
    </div>
  );
}
