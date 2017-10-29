// ---- Lightbox ----

const hideEl = el => (el.style.display = 'none');
const showEl = el => (el.style.display = null);

document.addEventListener('DOMContentLoaded', () => {
  const lightboxContainer = document.querySelector('.lightbox-container');
  const lightboxPhoto = document.querySelector('.lightbox-photo');
  let current;

  // Dismiss current with any click on lightbox
  lightboxContainer.addEventListener('click', () => {
    hideEl(lightboxContainer);
  });

  // On any photo click, set photo and show lightbox
  document.querySelectorAll('.picture').forEach(el => {
    const photoUrl = el.dataset.originalSize;
    el.addEventListener('click', () => {
      console.log('click', el);
      lightboxPhoto.setAttribute('src', photoUrl);
      showEl(lightboxContainer);
    });
  });
});
