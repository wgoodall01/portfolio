// Metalsmith plugin to load Flickr gallery URLs into an array based on metadata
var Flickr = require('flickr-sdk');

// CFG
//  apiKey
//  apiSecret
//
// Page.flickr
//  set_id
//  user_id
//  extras - url_o, description, etc.

module.exports = cfg => async (pages, metalsmith, done) => {
  const flickr = new Flickr(cfg);

  // All pages with `meta.flickr` defined.
  const flickrPagePaths = Object.keys(pages).filter(k => pages[k].flickr !== undefined);

  const addFlickrInfo = async page => {
    let extras = (page.flickr.extras || []).split(',').map(e => e.trim());
    extras.unshift('description', 'url_n');
    const extrasStr = Array.from(extras).join(', ');

    // Get photos from flickr
    const resp = await flickr
      .request()
      .albums(page.flickr.set_id)
      .media()
      .get({extras: extrasStr});

    // Add them to the page
    console.log(resp.body.photoset);
    page.flickr_photos = resp.body.photoset.photo;

    // Log some stuff
    console.log();
    console.log(`${page.title}: Flickr fetch`);
    for (const p of page.flickr_photos) {
      console.log(`\t${p.title || '<untitled>'} - ${p.description._content || '<no description>'}`);
    }
    console.log(`\t${resp.body.photoset.photo.length} photos added.\n`);
  };

  const fetchProms = [];
  for (const k of flickrPagePaths) {
    fetchProms.push(addFlickrInfo(pages[k]));
  }

  try {
    await Promise.all(fetchProms);
    done();
  } catch (e) {
    done(e);
  }
};
