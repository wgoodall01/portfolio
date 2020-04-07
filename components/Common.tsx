export interface ContainerProps {
  children: React.ReactNode;
  className: string;
}

export interface DisplayProps {
  overlap?: string;
  opacity?: number;
}

export function Display({
  children,
  className,
  overlap = null,
  opacity = 0
}: ContainerProps & DisplayProps) {
  return (
    <h1 className={className}>
      <style jsx>{`
        h1 {
          font-size: 4rem;
          line-height: 8rem;
          color: white;
          background-color: var(--color-primary);
          margin-left: -8rem;
          margin-right: 8rem;
          padding-left: 8rem;

          margin-top: 2rem;
        }

        @media screen and (max-width: 52rem) {
          h1 {
            margin-right: 0 !important;
            padding: 0 1rem;
            padding-left: 9rem;
          }
        }
      `}</style>
      <style jsx>{`
        h1 {
          margin-bottom: ${overlap ? `calc(-1 * ${overlap})` : "1rem"};
          padding-bottom: ${overlap ? overlap : "0"};
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

export function Card({ children, className }: ContainerProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          border-radius: 0.1rem;
          padding: 1rem;
          box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
          background-color: white;
        }
      `}</style>

      {children}
    </div>
  );
}

export function HBox({ children, className }: ContainerProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;
          margin-left: -1rem;
        }

        div > :global(*) {
          margin-left: 1rem;
        }
      `}</style>
      {children}
    </div>
  );
}
