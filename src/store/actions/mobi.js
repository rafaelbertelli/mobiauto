import {
  getCarBrandsService,
  getCarModelsService,
  getYearsService,
  getValueService,
} from '@services';

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
      dispatch({
        type: 'mobi/MODELS',
        payload,
      });

      return Promise.resolve(payload);
    })
    .catch(Promise.reject);
};

export const storeSelectedModel = selectedModel => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: 'mobi/SELECTEDMODEL',
      payload: selectedModel,
    });

    return resolve(selectedModel);
  });

export const getYears = () => (dispatch, getState) => {
  const store = getState();
  const brandId = store.mobi.selectedBrand.value;
  const modelId = store.mobi.selectedModel.value;

  return getYearsService({ brandId, modelId })
    .then(payload => {
      dispatch({
        type: 'mobi/YEARS',
        payload,
      });

      return Promise.resolve(payload);
    })
    .catch(Promise.reject);
};

export const getValue = () => (dispatch, getState) => {
  const store = getState();
  const brandId = store.mobi.selectedBrand.value;
  const modelId = store.mobi.selectedModel.value;
  const yearId = store.mobi.selectedYear.value;

  debugger;

  return getValueService({ brandId, modelId, yearId })
    .then(payload => {
      dispatch({
        type: 'mobi/VALUE',
        payload,
      });

      return Promise.resolve(payload);
    })
    .catch(Promise.reject);
};

export const storeSelectedYear = selectedYear => dispatch =>
  new Promise(resolve => {
    dispatch({
      type: 'mobi/SELECTEDYEAR',
      payload: selectedYear,
    });

    return resolve(selectedYear);
  });
