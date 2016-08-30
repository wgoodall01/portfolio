---
title: Portfolio
section: Projects
layout: project.jade

github:
    owner: "wgoodall01"
    repo: "portfolio"
enableDescription: true
---

This is my personal portfolio (this site). It uses the Metalsmith static site generator to build the site, pulling in resources from GitHub and Flickr. I use Travis CI to deploy the site to my user GitHub Pages repository on every push. Using a static site makes life a ton easier, because I don't have to worry about server issues - just about the content.

The frontend uses Bootstrap 4 and a little bit of jQuery for the photo gallery. All styles are written in Sass, and all pages and layouts are written in Jade.

Any dynamic page content is invoked by changing the YAML front matter of the page. Custom Metalsmith plugins then generate the content and add it to the page metadata before the page is rendered. That way, expanding the site with other content of the same general type is trivial (say, another Flickr gallery or a description of someone else's GitHub project) and code is nicely packaged up and reused. :)