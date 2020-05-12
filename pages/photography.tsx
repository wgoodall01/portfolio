import { Nav } from "../components/Common";
import { Container, PageLayout } from "../components/Layouts";
import Gallery from "react-photo-gallery";
import getConfig from "next/config";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

interface Thumb {
  // for react-photo-gallery
  src: string;
  width: number;
  height: number;
}

interface Props {
  thumbs: Thumb[];
}

export default function Photography({ thumbs }: Props) {
  return (
    <>
      <style jsx>{`
        .gallery-unpad {
          margin: -8px;
        }
      `}</style>
      <Container>
        <h1>Photography</h1>
        <p>
          I do photography as a hobby—whenever I go somewhere or do something
          fun, my camera comes with me. I find it really interesting to discover
          all the different ways that you can capture a particular moment.
        </p>
      </Container>
      <Container wide>
        <div className="gallery-unpad">
          <Gallery photos={thumbs} margin={8} />
        </div>
      </Container>
    </>
  );
}

Photography.title = "Photography";
Photography.layout = PageLayout;

/**
 * This function generates thumbnails from the photos, and copies them into Next's output directory.
 *
 */
export async function getStaticProps() {
  const {
    IN_DIR,
    THUMB_OUT_DIR,
    THUMB_OUT_PREFIX
  } = getConfig().serverRuntimeConfig.photos;

  // Make the output directory
  await fs.mkdir(THUMB_OUT_DIR, { recursive: true });

  let resizes = (await fs.readdir(IN_DIR))
    .sort()
    .reverse()
    .map(async filename => {
      const imgPath = path.join(IN_DIR, filename);
      const imgOutPath = path.join(THUMB_OUT_DIR, filename);

      let dimens: null | { width: number; height: number } = null;

      const img = sharp(imgPath);

      // Only resize if the image doesn't exist.
      try {
        await fs.stat(imgOutPath);
      } catch (err) {
        if (err.code != "ENOENT") {
          throw err;
        }

        // Resize the image, place thumbnail in OUT_DIR with name suffix.
        await img
          .resize(800)
          .jpeg({ quality: 50 })
          .toFile(imgOutPath);
      }

      // Get the image metadata
      const meta = await img.metadata();

      return {
        width: meta.width,
        height: meta.height,
        src: THUMB_OUT_PREFIX + filename
      };
    });

  const thumbs = await Promise.all(resizes);

  return {
    props: { thumbs }
  };
}
