import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const KEY = '30168156-67acd7ab620ceb0f9c67e2ca5';

export const GetImages = async (searchNames, page) => {
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


// export const GetImages = (searchNames, page) => {
//   return axios(
//     `${BASE_URL}?q=${searchNames}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//   );
// };