import { getCarBrandsService } from '@services';

export const getCarBrandsAction = () => (dispatch, getState) => {
  const store = getState();

  if (store.mobi.brands) {
    return Promise.resolve();
  }

  return getCarBrandsService()
    .then(payload => {
      dispatch({ type: 'mobi/BRANDS', payload });
      return Promise.resolve();
    })
    .catch(Promise.reject);
};
