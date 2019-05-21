import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCarBrandsAction } from '@store/actions/mobi';
import LoaderComponent from '@components/Loader';

import { Container } from '@styles/style';

class Home extends Component {
  state = {
    redirect: false,
    loading: false,
  };

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
          <h1 className="default-mb">Consulte aqui os dados da tabela FIPE</h1>
          {loading && <LoaderComponent type="CradleLoader" />}
          {!loading && <button onClick={this.handleClick}>Começar...</button>}
        </div>
      </Container>
    );
  }
}

Home.propTypes = {
  getCarBrandsAction: PropTypes.func,
  brands: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  brands: state.mobi.brands,
});

const mapDispatchToProps = {
  getCarBrandsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
