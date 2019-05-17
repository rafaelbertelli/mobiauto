export const bootstrap = props => dispatch => {
  dispatch({
    type: 'mobi/BOOTSTRAP',
  });
};

export const loading = param => (dispatch, getState) => {
  dispatch({
    type: 'mobi/LOADING',
    param,
  });
};
