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
import { limitPage } from './js/pixabay-api';
import galleryAdd from './js/render-functions';
import { galleryLoaderToggle } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery-list');
const loadButton = document.querySelector('.load-btn');
let searchImageName = '';
let page = 1;
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

function errorGallery(error) {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.remove();
  }
  alert(error);
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!loadButton.classList.contains('visually-hidden')) {
    loadButton.classList.add('visually-hidden');
  }
  searchImageName = searchForm.elements.search.value.trim();
  gallery.innerHTML = '';
  page = 1;
  if (!searchImageName) {
    return iziToast.info({
      message: "We're sorry, but you need to fill in the search area!",
      theme: 'light',
    });
  }
  galleryLoaderToggle();

  //далі йде звернення до функції з async/await у файлі pixabay-api.js
  //де потім результат обробляється у зовнішньому коді через методи then/catch
  getGallerySearch(searchImageName, page)
    .then(response => {
      const { hits } = response;
      if (hits.length === 0) {
        gallery.innerHTML = '';
        galleryLoaderToggle();
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#EF4040',
        });
      } else {
        renderGallery(hits);
      }
    })
    .catch(error => errorGallery(error));
  searchForm.reset();
});

loadButton.addEventListener('click', event => {
  loadButton.classList.add('visually-hidden');
  galleryLoaderToggle();
  page += 1;

  //далі йде звернення до функції з async/await у файлі pixabay-api.js
  //де потім результат обробляється у зовнішньому коді через методи then/catch
  getGallerySearch(searchImageName, page)
    .then(response => {
      const { hits, totalHits } = response;
      renderGallery(hits, totalHits);
      scrollGallery();
    })
    .catch(error => errorGallery(error));
});
