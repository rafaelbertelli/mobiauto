const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'mobi/LOADING':
      return {
        ...state,
        loading: action.param,
      };

    case 'mobi/BOOTSTRAP':
      return {
        ...state,
      };

    default:
      return state;
  }
};
