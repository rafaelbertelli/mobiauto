import { getCarBrandsService, getCarModelsService } from '@services';

export const getCarBrandsAction = () => (dispatch, getState) => {
  const store = getState();

  if (store.mobi.brands.length) {
    return Promise.resolve();
  }

  return getCarBrandsService()
    .then(payload => {
      dispatch({
        type: 'mobi/BRANDS',
        payload,
      });

      return Promise.resolve();
    })
    .catch(Promise.reject);
};

export const storeSelectedBrand = selectedBrand => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: 'mobi/SELECTEDBRAND',
      payload: selectedBrand,
    });

    return resolve(selectedBrand);
  });

export const getCarModels = () => (dispatch, getState) => {
  const store = getState();
  const brandId = store.mobi.selectedBrand.value;

  return getCarModelsService(brandId)
    .then(payload => {
      console.log('------------ ANTES DA DISPATCH', payload);
      dispatch({
        type: 'mobi/MODELS',
        payload,
      });

      console.log('+++++++++++++++ DEPOIS DA DISPATCH', payload);

      return Promise.resolve(payload);
    })
    .catch(Promise.reject);
};
