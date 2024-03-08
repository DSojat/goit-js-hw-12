// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  messageSize: '16',
  messageLineHeight: '24',
  maxWidth: 432,
  theme: 'dark',
  position: 'topRight',
});

// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import getGallerySearch from './js/pixabay-api';
import { nextPage } from './js/pixabay-api';
import { limitPage } from './js/pixabay-api';
import { page } from './js/pixabay-api';
import galleryAdd from './js/render-functions';
import { galleryLoaderToggle } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-list');
const loadButton = document.querySelector('.load-btn');
let searchImageName = '';
const instanceGallery = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function renderGallery(hits, totalHits) {
  const totalPages = Math.ceil(totalHits / limitPage);
  galleryLoaderToggle();
  galleryAdd(hits);
  instanceGallery.refresh();
  if (page >= totalPages) {
    return iziToast.info({
      message: "We're sorry, but you've reached the end of search results",
      iconUrl: null,
      theme: 'light',
    });
  }
  loadButton.classList.remove('visually-hidden');
}

function scrollGallery() {
  const elem = document.querySelector('.gallery-item');
  const { height } = elem.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    left: 0,
    behavior: 'smooth',
  });
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!loadButton.classList.contains('visually-hidden')) {
    loadButton.classList.add('visually-hidden');
  }
  searchImageName = searchForm.elements.search.value.trim();

  if (searchImageName) {
    gallery.innerHTML = '';
    galleryLoaderToggle();
    getGallerySearch(searchImageName).then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        gallery.innerHTML = '';
        galleryLoaderToggle();
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
          iconUrl: './img/xoctagon.svg',
        });
      } else {
        renderGallery(hits);
        scrollGallery();
      }
    });
    searchForm.reset();
  } else {
    gallery.innerHTML = '';
  }
});

loadButton.addEventListener('click', event => {
  loadButton.classList.add('visually-hidden');
  galleryLoaderToggle();
  nextPage(searchImageName).then(({ hits, totalHits }) => {
    renderGallery(hits, totalHits);
    scrollGallery();
  });
});
