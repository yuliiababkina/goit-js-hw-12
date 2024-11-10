import axios from 'axios';

const API_KEY = '46809369-ad82ab8216a47e5b0b084ef25';
const BASE_URL = 'https://pixabay.com/api/';

export async function getPictures(query, page) {
  const response = await axios(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      page,
      per_page: 15,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    },
  });

  return response.data;
}
