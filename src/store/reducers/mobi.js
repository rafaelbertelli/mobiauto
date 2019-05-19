const INITIAL_STATE = {
  brands: [],
  models: [],
  years: [],
  price: {},
  selectedBrand: {},
  selectedModel: {},
  selectedYear: {},
  selectedPrice: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'mobi/BRANDS':
      return {
        ...state,
        brands: action.payload,
      };

    case 'mobi/SELECTEDBRAND':
      return {
        ...state,
        selectedBrand: action.payload,
      };

    case 'mobi/MODELS':
      return {
        ...state,
        models: action.payload,
      };

    default:
      return state;
  }
};
