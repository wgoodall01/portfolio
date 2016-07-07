var GithubApi = require("github");
var github = new GithubApi();

module.exports = function(){

    return function(pages, metalsmith, done){
        var promises =
            Object.keys(pages)
            .filter((pageUrl) => typeof pages[pageUrl].github != 'undefined')
            .map(function(pageUrl){
                return new Promise((accept, reject)=> {
                    var page = pages[pageUrl];
                    if(page.github && page.github.owner && page.github.repo){
                        accept()
                    } else {
                        reject(new Error("No github info in page metadata"))
                    }
                })

                .then(() => {
                    //Get repo data
                    return github.repos.get({
                        user: pages[pageUrl].github.owner,
                        repo: pages[pageUrl].github.repo
                    })
                })

                .then(function(resp){
                    pages[pageUrl].github_data = resp;
                })

            });

        Promise.all(promises)
            .then(function(){
                done();
            })
            .catch(function(err){
                done(err);
            })
    }
};