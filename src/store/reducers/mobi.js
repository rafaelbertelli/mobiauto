const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'mobi/BRANDS':
      return {
        ...state,
        brands: action.payload,
      };

    default:
      return state;
  }
};
