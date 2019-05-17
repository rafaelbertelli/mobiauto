import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

export const getCarBrandsService = () =>
  axios
    .get(BASE_URL)
    .then(res => {
      if (res.status !== 200) return Promise.reject(res.statusText);

      return Promise.resolve(res.data);
    })
    .catch(Promise.reject);
