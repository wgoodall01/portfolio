const path = require("path");

let conf = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  serverRuntimeConfig: {
    photos: {
      IN_DIR: path.resolve("./photos"),

      THUMB_OUT_DIR: path.resolve("./.next/static/media/photos/thumbs/"),
      THUMB_OUT_PREFIX: "/_next/static/media/photos/thumbs/"
    }
  }
};

// Add MDX support
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});
conf = withMDX(conf);

module.exports = conf;
