import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import { LoaderContainer } from './styles.js';

export default function LoaderComponent({ type }) {
  return (
    <LoaderContainer>
      <Loader type={type} color="#00BFFF" height="100" width="100" />
    </LoaderContainer>
  );
}

LoaderComponent.propTypes = {
  type: PropTypes.string,
};

/**
 * @Documentation
 * [https://www.npmjs.com/package/react-loader-spinner]
 */
