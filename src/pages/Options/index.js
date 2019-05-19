import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import LoaderComponent from '@components/Loader';
import { storeSelectedBrand, getCarModels } from '@actions/mobi';

import { Container } from '@styles/style';

const QUESTIONS = {
  1: 'Selecione a marca do carro',
  2: 'Selecione o modelo do carro',
};

class Options extends React.Component {
  state = {
    level: 1,
    redirect: false,
    selectedValue: null,
    isLoading: false,
    options: this.props.brands,
  };

  handleReset = () => this.setState({ redirect: true });

  handleSelect = selectedOption => {
    console.log('handle select', this.state.level);

    this.props
      .storeSelectedBrand(selectedOption)
      .then(res => {
        console.log('}}}}}}}}}}}}}}}}}}}}}}}', this.props.selectedBrand);
        this.setState({
          selectedValue: res,
        });
      })
      .catch(err => alert(err))
      .finally(() => console.log('´´´´´´´´´´´´´´´´´', this.props.selectedBrand));

    /**
     * de acordo com cada nivel de acao, chamar uma action
     */
  };

  handleNext = e => {
    /**
     * verificar aqui qual é o nível de ação e disparar um a atualização da store
     */

    const prevLevel = this.state.level;
    const nextLevel = this.state.level + 1;

    const limitLevel = Object.keys(QUESTIONS).length;

    if (nextLevel > limitLevel) {
      return console.log('~~~~~~~', 'mostrar a tela de conclusao');
    }

    this.setState({ isLoading: true });

    this.props
      .getCarModels()
      .then(res => {
        /**
         * O problema está aqui
         * Eu deveria já ter acesso à store, no entanto, neste momento,
         * a props.models está pegando o estado anterior
         */
        console.log(
          '============ TEM QUE VIR OS MODELOS DE CARROS ==============',
          this.props.mobi,
          this.props.models,
          res
        );

        debugger;

        this.setState({
          isLoading: false,
          options: this.props.models,
          level: nextLevel,
        });
      })
      .catch(err => {
        debugger;
      });
  };

  componentDidMount() {
    console.log('EFEITO', this.state.level, this.props.selectedBrand, this.props.mobi);
    if (!this.props.mobi.brands.length) {
      return this.props.history.push('/');
    }
  }

  render() {
    return this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <Container>
        <div className="wrapper">
          <h1 className="default-mb">{QUESTIONS[this.state.level]}</h1>

          <form onSubmit={e => e.preventDefault()}>
            <Select
              className="default-mb"
              value={this.state.selectedValue}
              onChange={this.handleSelect}
              options={this.state.options}
            />

            {this.state.isLoading ? (
              <LoaderComponent type="CradleLoader" />
            ) : (
              <div className="buttons">
                <button onClick={this.handleReset}>Reset</button>
                <button type="submit" onClick={this.handleNext}>
                  Próxima
                </button>
              </div>
            )}
          </form>
        </div>
      </Container>
    );
  }
}

Options.propTypes = {
  history: PropTypes.object,
  brands: PropTypes.arrayOf(PropTypes.object),
  storeSelectedBrand: PropTypes.func,
  getCarModels: PropTypes.func,
  models: PropTypes.arrayOf(PropTypes.object),
  selectedBrand: PropTypes.object,
  mobi: PropTypes.object,
};

const mapStateToProps = ({ mobi }) => ({
  brands: mobi.brands,
  selectedBrand: mobi.selectedBrand,
  models: mobi.models,
  mobi,
});

const mapDispatchToProps = {
  storeSelectedBrand,
  getCarModels,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
