// If a page has hidden=true, remove it.
module.exports = function(disabled) {
  return function(pages, metalsmith, next) {
    for (var pageUrl in pages) {
      var page = pages[pageUrl];
      if (page.hidden) {
        delete pages[pageUrl];
        console.log(`${pageUrl} was hidden.`);
      }
    }
    next();
  };
};
