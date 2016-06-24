// If a page has `construction=true` in front matter, replace it w/ generic under construction thing
module.exports = function(){
    return function(pages, metalsmith, next){
        for(var pageUrl in pages){
            var page = pages[pageUrl];
            if(page.construction){
                page.layout = "base.jade";
                page.styles = ["/css/cover.css"];
                page.contents = new Buffer(`
.card.card-block.card-primary.main-card.card-inverse
    h4.card-title Under Construction
    p.card-text Come back later, maybe.
                `);
                pages[pageUrl] = page;
            }
        }
        next();
    };
};
