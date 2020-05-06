const path = require("path");

module.exports = {
  serverRuntimeConfig: {
    photos: {
      IN_DIR: path.resolve("./photos"),

      THUMB_OUT_DIR: path.resolve("./.next/static/media/photos/thumbs/"),
      THUMB_OUT_PREFIX: "/_next/static/media/photos/thumbs/"
    }
  }
};
