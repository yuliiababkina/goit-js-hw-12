import { createMarkup } from './js/render-functions';
import { fetchData } from './js/pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let instance = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 300,
  overlay: true,
  overlayOpacity: 0.7,
});

form.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.searchQuery.value.trim();

  if (query === '') {
    return iziToast.info({
      timeout: 3000,
      position: 'topRight',
      title: 'Sorry',
      message: 'Please fill your search query in!',
    });
  }

  showLoader();

  fetchData(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          timeout: 3000,
          position: 'topRight',
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      gallery.innerHTML = createMarkup(data.hits);
      instance.refresh();
    })
    .catch(error => console.log(error))
    .finally(() => {
      hideLoader();
      form.reset();
    });
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}
