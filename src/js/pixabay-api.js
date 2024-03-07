import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const limitPage = 15;
export let page = 1;
let oldName = '';

export default async function getGallerySearch(searchImageName) {
  const searchParams = new URLSearchParams({
    key: '42608378-1c88fd965c25ed4d8c49bb63d',
    q: searchImageName,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: limitPage,
    page: page,
  });
  try {
    if (searchImageName !== oldName) {
      page = 1;
      oldName = searchImageName;
    }
    const response = await axios.get(`?${searchParams}`);
    return response.data;
  } catch {
    error => alert(error);
  }
}

export async function nextPage(searchImageName) {
  page += 1;
  const response = await getGallerySearch(searchImageName);
  return response;
}
