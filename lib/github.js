var GithubApi = require("github");
var github = new GithubApi();
var marked = require("marked");

module.exports = function(cfg){
    // CFG
    // apiToken

    github.authenticate({
        type: "oauth",
        token: cfg.apiToken
    });

    return function(pages, metalsmith, done){
        var promises =
            Object.keys(pages)
            .filter((pageUrl) => typeof pages[pageUrl].github != "undefined")
            .map(function(pageUrl){
                return new Promise((accept, reject)=> {
                    var page = pages[pageUrl];
                    if(page.github && page.github.owner && page.github.repo){
                        accept();
                    } else {
                        reject(new Error("No github info in page metadata"));
                    }
                })

                .then(() => {
                    // Get repo data
                    return github.repos.get({
                        user: pages[pageUrl].github.owner,
                        repo: pages[pageUrl].github.repo
                    });
                })

                .then(function(resp){
                    pages[pageUrl].github_data = resp;
                })

                .then(function(){
                    return github.repos.getReadme({
                        user: pages[pageUrl].github.owner,
                        repo: pages[pageUrl].github.repo
                    });
                })
                
                .then(function(resp){
                    var readme = new Buffer(resp.content, resp.encoding).toString("utf-8");
                    pages[pageUrl].github_readme = marked(readme);
                });
                
            });

        Promise.all(promises)
            .then(function(){
                done();
            })
            .catch(function(err){
                done(err);
            });
    };
};