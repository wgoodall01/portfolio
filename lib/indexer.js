module.exports = function(){
    return function(pages, metalsmith, done){

        var promises =
            Object.keys(pages)
                .filter( pageUrl => typeof pages[pageUrl].indexDir != 'undefined')
                .map(function(pageUrl){
                    return new Promise((accept, reject) => {
                        console.log(pageUrl);

                        var indexDir = pages[pageUrl].indexDir;

                        var indexData = [];

                        // For each page that matches the index dir, add its metadata to an array in the
                        // page's metadata
                        Object.keys(pages)
                            .filter(indUrl => indUrl.indexOf(indexDir) == 0)
                            .forEach(indUrl => indexData.push(pages[indUrl]));
                        
                        //Add the indexed pages to the page metadata
                        pages[pageUrl].index_data = indexData;

                        accept(); // end promise
                    })
                });

        Promise.all(promises)
            .then( () => done() )
            .catch( err => done(err) )
    };
};