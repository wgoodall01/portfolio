var Metalsmith = require("metalsmith");
var sass = require("metalsmith-sass");
var markdown = require("metalsmith-markdown");
var layouts = require("metalsmith-layouts");
var jade = require("metalsmith-jade");
var htmlMinifier = require("metalsmith-html-minifier");
var cssMinifier = require("metalsmith-clean-css");
var jsMinifier = require("metalsmith-uglify");
var cleanUrls = require("metalsmith-clean-urls");

// Configuration - load from env with defaults sometimes
var cfg = {
    flickr:{
        key: process.env.FLICKR_API_KEY,
        secret: process.env.FLICKR_API_SECRET
    },
    dev: process.env.DEV && 
        ['true', 'y', 't', 'yes', '1'].indexOf(process.env.DEV.toLowerCase()) != -1,
    port: process.env.PORT || 8080
};


var m = new Metalsmith(__dirname);
m.source("./src");

//Compile all sass files in src to stylesheets in `out`, using
// partials and other stuff in `scss/` to help out.
m.use(sass({includePaths:[
    __dirname + "/scss",
    __dirname + "/node_modules/bootstrap/scss"
]}));

//Compile all markdown files to html
m.use(markdown());

//Compile all jade files to html
m.use(jade());

//Add page contents to layouts
m.use(layouts({
    engine:'jade',
    directory:'layouts'
}));

//Minify all HTML, CSS, JS
m.use(htmlMinifier());
m.use(cssMinifier());
m.use(jsMinifier());

//Clean all HTML endpoints
m.use(cleanUrls());

if(cfg.dev){
    //Load metalsmith-watch
    var watch = require("metalsmith-watch");
    m.use(watch({
        livereload: true,
        paths:{
            "scss/**/*": "**/*.scss",
            "layouts/**/*": "**/*",
            "lib/**/*": "**/*",
            "${source}/**/*": true
        }
    }));
}

m.destination("./out");
m.build(function(err){
    if(err){
        console.log("ERROR");
        console.log(err);
    } else{
        console.log("DONE");
    }
});

if(cfg.dev){
    //Start dev server with express
    var express = require('express');
    app = express();
    app.use(express.static(__dirname + "/out"));
    app.listen(cfg.port);
    console.log(`  >>> Started dev server on http://localhost:${cfg.port} <<<  `);
}

