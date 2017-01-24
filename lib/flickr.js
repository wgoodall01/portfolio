// Metalsmith plugin to load Flickr gallery URLs into an array based on metadata
var Flickr = require("flickr-sdk");


module.exports = function (cfg) {
    // CFG
    //  apiKey
    //  apiSecret
    //
    // Page.flickr
    //  set_id
    //  user_id
    //  extras - url_o, description, etc.

    return function (pages, metalsmith, done) {

        var flickr = new Flickr(cfg);

        var allProms = [];
        for(var pageUrl in pages){
            !function inner(pageUrl){ // Wrapper function to fix loop scope
                if(typeof pages[pageUrl].flickr != "undefined"){
                    // Fetch info from Flickr

                    allProms.push(flickr
                        .request()
                        .albums(pages[pageUrl].flickr.set_id)
                        .media()
                        .get({extras:pages[pageUrl].flickr.extras})
                        .then(function(resp){
                            // Add photos to page.
                            pages[pageUrl].flickr_photos = resp.body.photoset;

							// Log photos
							console.log();
							console.log(`${pageUrl}: Flickr fetch:`);
							resp.body.photoset.photo.forEach((p) => 
									console.log(`\t${p.title || "<no title>"} - ${p.description._content || "<no description>"}`));
							console.log(`\t${resp.body.photoset.photo.length} photos added.`);
							console.log()
                        })
                    );

                }
            }(pageUrl);
        }

        Promise.all(allProms).then(function(){
            done();
        }).catch(function(err){
            done(err);
        });
    };
};
