import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loading, getCarBrandsAction } from '@store/actions/mobi';
import LoaderComponent from '@components/Loader';

import { Container } from '@styles/style';

class Home extends Component {
  state = {
    redirect: false,
    loading: false,
  };

  componentDidMount() {
    console.log(this.props.brands);
  }

  handleClick = () => {
    this.setState({ loading: true });

    this.props
      .getCarBrandsAction()
      .then(() => this.setState({ redirect: true }))
      .catch(err => {
        this.setState({ loading: false });
        alert('Algo estranho aconteceu');
      });
  };

  render() {
    const { loading } = this.state;

    return this.state.redirect ? (
      <Redirect to="/options" />
    ) : (
      <Container>
        <div className="wrapper">
          <h1 className="title">Bora começar?!</h1>

          {loading ? (
            <LoaderComponent type="CradleLoader" />
          ) : (
            <button onClick={this.handleClick}>Bora lá...</button>
          )}
        </div>
      </Container>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.func,
  getCarBrandsAction: PropTypes.func,
  brands: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  brands: state.mobi.brands,
});

const mapDispatchToProps = dispatch => ({
  loading: params => dispatch(loading(params)),
  getCarBrandsAction: () => dispatch(getCarBrandsAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
