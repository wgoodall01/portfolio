document.addEventListener('DOMContentLoaded', () => {
  // ---- Lightbox ----
  const hideEl = el => (el.style.display = 'none');
  const showEl = el => (el.style.display = null);

  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightboxPhoto = document.querySelector('.lightbox-photo');

  // Dismiss current with any click on lightbox
  lightboxContainer.addEventListener('click', () => {
    hideEl(lightboxContainer);
  });

  // On any photo click, set photo and show lightbox
  document.querySelectorAll('.picture').forEach(el => {
    const photoUrl = el.dataset.originalSize;
    el.addEventListener('click', () => {
      lightboxPhoto.setAttribute('src', photoUrl);
      showEl(lightboxContainer);
    });
  });
});

document.onreadystatechange = () => {
  if (document.readyState == 'complete') {
    // ---- Masonry layout ----
    const br = Bricks({
      container: '.gallery',
      packed: 'data-packed',
      sizes: [{columns: 1, gutter: 20}, {mq: '400px', columns: 2, gutter: 10}]
    });

    br
      .on('pack', () => console.log('Packed'))
      .on('update', () => console.log('update'))
      .on('resize', size => console.log('resize to', size));

    br.resize(true).pack(); // Run the layout.
  }
};
