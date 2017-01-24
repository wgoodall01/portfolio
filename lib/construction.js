// If a page has `construction=true` in front matter, replace it w/ generic under construction thing
module.exports = function(disabled){
    return function(pages, metalsmith, next){
        for(var pageUrl in pages){
            var page = pages[pageUrl];
            if(page.construction && !disabled){
                page.layout = "construction.jade";
				console.log(`\n${pageUrl} is under construction.`);
            }
        }
        next();
    };
};
