module.exports = function() {
  return function(pages, metalsmith, done) {
    var promises = Object.keys(pages)
      .filter(pageUrl => typeof pages[pageUrl].indexDir != 'undefined')
      .map(function(pageUrl) {
        return new Promise((accept, reject) => {
          var indexDir = pages[pageUrl].indexDir;

          var indexData = [];

          // For each page that matches the index dir, add its metadata to an array in the
          // page's metadata
          Object.keys(pages)
            .filter(indUrl => indUrl.indexOf(indexDir) == 0)
            .forEach(indUrl => {
              var page = pages[indUrl];
              // Assume URL rewrite & clean
              page.url = indUrl.replace(/\..*$/i, '');
              page.index = parseInt(page.index) || 0;
              indexData.push(page);
            });

          // Sort the pages based on index
          indexData = indexData.sort((a, b) => (b.index || 0) - (a.index || 0));

          // Add the indexed pages to the page metadata
          pages[pageUrl].index_data = indexData;

          // Log some stuff.
          console.log('');
          indexData.forEach(p => p.index && console.log(`index: ${p.title} @ ${p.index}`));

          accept(); // end promise
        });
      });

    Promise.all(promises)
      .then(() => done())
      .catch(err => done(err));
  };
};
