export { createMarkup };

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
              <img class="gallery-img" src="${webformatURL}" alt="${tags}" width="360"  />
            
            <div class="gallery-info">
              <div class="gallery-info-titles">
                <p><b>Likes</b></p>
                <p><b>Views</b></p>
                <p><b>Comments</b></p>
                <p><b>Downloads</b></p>
              </div>
              <div class="gallery-info-values">
                <p>${likes}</p>
                <p>${views}</p>
                <p>${comments}</p>
                <p>${downloads}</p>
              </div>
            </div>
            </a>
          </li>`
    )
    .join('');
}
