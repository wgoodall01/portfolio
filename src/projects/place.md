---
title: Place
section: Projects
layout: project.jade

index: 0

github:
    owner: "wgoodall01"
    repo: "place"
enableDescription: true
hasReadme: true
---

I wrote this to log all pixels from /r/place. At the time, I thought I could do some cool stuff with all the data, so I wrote this tiny scraper to get data from the WebSocket connection and log it to a sqlite3 database. However, I did not really expect the massive popularity of /r/place - in retrospect, sqlite didn't work out, and couldn't keep up with the load.

Even though the data was very incomplete, I was able to make some cool visualizations with it, like [this heatmap on Tableau Public.](https://public.tableau.com/profile/william.goodall#!/vizhome/Place/Pixelsmin)


In addition, the `export_png.js` script can generate PNGs from the /r/place canvas at any time it has scraped, so I made a timelapse of the data I had:

<iframe src="https://vid.me/e/kfUe?stats=1" width="480" height="480" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe>


