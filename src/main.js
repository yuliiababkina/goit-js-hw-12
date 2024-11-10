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

let page = 1;
let searchQuery = null;

refs.form.addEventListener('submit', handleSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function handleSearch(event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';

  searchQuery = event.currentTarget.searchQuery.value.trim();

  if (!searchQuery) {
    return iziToast.info({
      timeout: 3000,
      position: 'topRight',
      title: 'Sorry',
      message: 'Please fill your search query in!',
    });
  }

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
    }

    refs.gallery.innerHTML = createMarkup(response.hits);
    response.totalHits > response.hits.length
      ? showLoadMoreBtn()
      : hideLoadMoreBtn();
    instance.refresh();
  } catch (error) {
    console.log(error.message);
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
  refs.loadMoreBtn.classList.replace('is-hidden', 'load-more');
}

function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.replace('load-more', 'is-hidden');
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreBtn();

  showLoader();
  try {
    const response = await getPictures(searchQuery, page);
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    instance.refresh();

    let lastPage = Math.ceil(response.totalHits / response.hits.length);

    if (lastPage === page) {
      onEndOfSearchRequest();
    }

    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;

    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error.message);
  } finally {
    showLoadMoreBtn();
    hideLoader();
  }
}

function onEndOfSearchRequest() {
  refs.loadMoreBtn.classList.replace('load-more', 'is-hidden');

  return iziToast.info({
    timeout: 3000,
    position: 'topRight',
    title: 'Info',
    message: 'We are sorry, but you have reached the end of search results.',
  });
}
