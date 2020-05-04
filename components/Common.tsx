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

          font-size: 4rem;

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

export function Card({ children, className }: ContainerProps) {
  return (
    <div className={className}>
      <style jsx>{`
        div {
          position: relative;
          padding: 1rem;
          box-shadow: 0 0 2rem rgba(0, 0, 0, 0.8);
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
