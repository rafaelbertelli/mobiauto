import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loading } from '@store/actions/mobi';

import { Container } from '@styles/style';

class Home extends Component {
  state = { redirect: false };

  componentDidMount() {
    // It is a simple valitation to see redux working
    this.props.loading(true);
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/user" />
    ) : (
      <Container>
        <div className="wrapper">
          <h1>Bora começar?!</h1>
          <button onClick={() => this.setState({ redirect: true })}>Bora lá...</button>
        </div>
      </Container>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.func,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loading: params => dispatch(loading(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
