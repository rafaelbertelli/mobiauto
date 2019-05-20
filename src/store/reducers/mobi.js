const INITIAL_STATE = {
  brands: [],
  models: [],
  years: [],
  value: {},
  selectedBrand: {},
  selectedModel: {},
  selectedYear: {},
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

    case 'mobi/SELECTEDMODEL':
      return {
        ...state,
        selectedModel: action.payload,
      };

    case 'mobi/YEARS':
      return {
        ...state,
        years: action.payload,
      };

    case 'mobi/SELECTEDYEAR':
      return {
        ...state,
        selectedYear: action.payload,
      };

    case 'mobi/VALUE':
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};
