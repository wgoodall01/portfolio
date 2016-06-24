var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var jade = require("metalsmith-jade");

// Configuration - load from env with defaults sometimes
var cfg = {
    port: process.env.PORT || 8080,
    flickr:{
        key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_SECRET
    }
};


new Metalsmith(__dirname)
    .source("./src")

    //Compile all sass files in src to stylesheets in `out`, using
    // partials and other stuff in `scss/` to help out
    .use(sass({includePaths:[__dirname + "/scss"]}))

    //Compile all markdown files to html
    .use(markdown())

    //Compile all jade files to html
    .use(jade())

    //Add page contents to layouts
    .use(layouts({
        engine:'jade',
        directory:'layouts'
    }))

    .destination("./out")
    .build(function(err){
        if(err){
            console.log("ERROR");
            throw err;
        } else{
            console.log("DONE")
        }
    });

