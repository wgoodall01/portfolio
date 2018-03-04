const Flickr = require('flickr-sdk');
const rp = require('request-promise-native');

// Metalsmith plugin to load Flickr gallery URLs into an array based on metadata
//
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

  const downloadThumb = async photo => {
    const url = `flickr-imgs/${photo.id}.${photo.url_n.split('.').slice(-1)[0]}`;
    console.log(`Downloading thumb for ${photo.title}`);
    const resp = await rp({url: photo.url_n, encoding: null}); // get photo as Buffer
    pages[url] = {contents: resp};
    photo.thumb = '/' + url;
    return photo;
  };

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
    let photos = resp.body.photoset.photo;

    // Download thumbs
    photos = await Promise.all(photos.map(p => downloadThumb(p)));

    // Add everything to the page
    page.flickr_photos = photos;

    // Log some stuff
    console.log();
    console.log(`${page.title}: Flickr fetch`);
    for (const p of photos) {
      console.log(`\t${p.title || '<untitled>'} - ${p.description._content || '<no description>'}`);
    }
    console.log(`\t${resp.body.photoset.photo.length} photos added.\n`);
  };

  // All pages with `meta.flickr` defined.
  const flickrPagePaths = Object.keys(pages).filter(k => pages[k].flickr !== undefined);

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
