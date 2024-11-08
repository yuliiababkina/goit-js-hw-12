export { fetchData };

const API_KEY = '46809369-ad82ab8216a47e5b0b084ef25';
const BASE_URL = 'https://pixabay.com/api/';

function fetchData(query) {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${queryParams.toString()}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
