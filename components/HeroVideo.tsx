interface Props {
  className?: string;
}

export default function HeroVideo({ className }: Props) {
  return (
    <div>
      <style jsx>{`
        div {
          flex: 1;
          position: relative;

          background-color: black;
          overflow: hidden;
        }

        video {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;

          object-fit: cover;
          object-position: center;
        }
      `}</style>
      <video src="/cover.webm" autoPlay loop muted />
    </div>
  );
}
