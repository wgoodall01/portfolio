#!/usr/bin/env node
/*                                                      William Goodall's
   ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗ 
   ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
   ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
   ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
   ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
   ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝  */


//     ------------------------------   Dependencies         ------------------------------

// Metalsmith & plugins
var Metalsmith   = require("metalsmith");
var cleanUrls    = require("metalsmith-clean-urls");
var cssMinifier  = require("metalsmith-clean-css");
var htmlMinifier = require("metalsmith-html-minifier");
var jade         = require("metalsmith-jade");
var jsMinifier   = require("metalsmith-uglify");
var layouts      = require("metalsmith-layouts");
var markdown     = require("metalsmith-markdown");
var sass         = require("metalsmith-sass");
var autoprefixer = require("metalsmith-autoprefixer");

// Other stuff
var dotenv       = require("dotenv");

// Local libs
var construction = require("./lib/construction");
var flickr       = require("./lib/flickr");
var github       = require("./lib/github");
var indexer      = require("./lib/indexer");

//     ------------------------------   Configuration         ------------------------------

// Get config from dotenv
dotenv.config({silent: true}); 

// Structure the config
var cfg = {
    flickr:{
        apiKey: process.env.FLICKR_API_KEY,
        apiSecret: process.env.FLICKR_API_SECRET
    },
    github:{
        apiToken: process.env.GITHUB_API_TOKEN
    },
    dev: process.env.DEV &&
        ["true", "y", "t", "yes", "1"].indexOf(process.env.DEV.toLowerCase()) != -1,
    port: process.env.PORT || 8080
};


var m = new Metalsmith(__dirname);
m.source("./src");


//     ------------------------------   Compilation           ------------------------------
// Add flickr content to `flickr_photos` local
m.use(flickr(cfg.flickr));

// Add github content to `github_content` local
m.use(github(cfg.github));

// Build index pages
m.use(indexer());

// If a page is under construction && not in dev mode, don't show it
m.use(construction(cfg.dev));

// Compile all sass files in src to stylesheets in `out`, using
// partials and other stuff in `scss/` to help out.
m.use(sass({includePaths:[
    __dirname + "/scss",
    __dirname + "/node_modules/bootstrap/scss"
]}));

// Compile all markdown files to html
m.use(markdown());

// Compile all jade files to html
m.use(jade({
    useMetadata:true
}));

// Add page contents to layouts
m.use(layouts({
    engine:"jade",
    directory:"layouts"
}));

//     ------------------------------   Post-Processing       ------------------------------
// Autoprefix the CSS
m.use(autoprefixer());

// Minify all HTML, CSS, JS
m.use(htmlMinifier());
m.use(cssMinifier());
m.use(jsMinifier());

// Clean all HTML endpoints
m.use(cleanUrls());

//     ------------------------------   Dev Info              ------------------------------
if(cfg.dev){
    // Load metalsmith-watch
    var watch = require("metalsmith-watch");
    m.use(watch({
        paths:{
            "${source}/**/*.*": "**/*.*" // Everything rebuilds everything
        }
    }));
}


// Logging
m.use(function(files, metalsmith, next){
    for(var filename in files){
        console.log(`${filename} <- ${files[filename].layout || "[no layout]"} <- ${files[filename].title || "[untitled]" }`);
    }
    next();
});

//     ------------------------------   Output                ------------------------------
m.destination("./out");

var exitIfNotDev = function(code){
    if(!cfg.dev){
        process.exit(code);
    }
};

m.build(function(err){
    if(err){
        console.log("  >>> ERROR <<<  ");
        console.log(err);
        exitIfNotDev(1);
    } else{
        console.log("  >>> DONE BUILD <<<  ");
        exitIfNotDev(0);
    }
});

if(cfg.dev){
    // Start dev server with express
    var express = require("express");
    var app = express();
    app.use(express.static(__dirname + "/out"));
    app.listen(cfg.port);
    console.log(`  >>> Started dev server on http://localhost:${cfg.port} <<<  `);
}

