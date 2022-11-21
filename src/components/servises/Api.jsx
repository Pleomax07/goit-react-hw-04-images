import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '30168156-67acd7ab620ceb0f9c67e2ca5';

// export const FetchImages = async (searchNames, page) => {
//   const res = await fetch(
//     `${BASE_URL}/?q=${searchNames}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   ).then(response => response.json());

//   return res;
// };


export const FetchImages = async (searchNames, page) => {
  const res = await axios(BASE_URL, {
    params: {
      q: searchNames,
      page: page,
      key: KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return res;
};
