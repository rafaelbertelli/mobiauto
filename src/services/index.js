import axios from 'axios';

const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros/marcas';

export const getCarBrandsService = () =>
  axios
    .get(BASE_URL)
    .then(res => {
      if (res.status !== 200) return Promise.reject(res.statusText);

      const formatedResponse = res.data.map(item => ({ value: item.codigo, label: item.nome }));

      return Promise.resolve(formatedResponse);
    })
    .catch(Promise.reject);

export const getCarModelsService = brandId =>
  axios
    .get(`${BASE_URL}/${brandId}/modelos`)
    .then(res => {
      if (res.status !== 200) return Promise.reject(res.statusText);

      const formatedResponse = res.data.modelos.map(item => ({
        value: item.codigo,
        label: item.nome,
      }));

      return Promise.resolve(formatedResponse);
    })
    .catch(Promise.reject);
