import { createMarkup } from './js/render-functions';
import { getPictures } from './js/pixabay-api';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  loader: document.querySelector('.loader'),
};

let instance = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 300,
  overlay: true,
  overlayOpacity: 0.7,
});

let page;
let searchQuery;
let lastPage;

refs.form.addEventListener('submit', handleSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  searchQuery = event.currentTarget.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.info({
      timeout: 3000,
      position: 'topRight',
      title: 'Sorry',
      message: 'Please fill your search query in!',
    });
    return;
  }

  page = 1;
  refs.gallery.innerHTML = '';
  hideLoadMoreBtn();
  showLoader();

  try {
    const response = await getPictures(searchQuery, page);

    if (response.hits.length === 0) {
      iziToast.error({
        timeout: 3000,
        position: 'topRight',
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createMarkup(response.hits, refs.gallery);
    instance.refresh();

    lastPage = Math.ceil(response.totalHits / response.hits.length);

    if (lastPage === page) {
      onEndOfSearchRequest();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      timeout: 3000,
      position: 'topRight',
      title: 'Error',
      message: 'Ooops, something went wrong. Please try again!',
    });
  } finally {
    refs.form.reset();
    hideLoader();
  }
}

function showLoader() {
  refs.loader.classList.remove('is-hidden');
}

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}

function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const response = await getPictures(searchQuery, page);
    createMarkup(response.hits, refs.gallery);
    instance.refresh();

    if (lastPage === page) {
      onEndOfSearchRequest();
    } else {
      showLoadMoreBtn();
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      timeout: 3000,
      position: 'topRight',
      title: 'Error',
      message: 'Ooops, something went wrong. Please try again!',
    });
  } finally {
    hideLoader();
  }
}

function onEndOfSearchRequest() {
  hideLoadMoreBtn();

  return iziToast.info({
    timeout: 3000,
    position: 'topRight',
    title: 'Info',
    message: 'We are sorry, but you have reached the end of search results.',
  });
}
