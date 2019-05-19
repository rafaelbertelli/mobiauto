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

const Options = props => {
  const [level, setLevel] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(props.brands);

  const handleReset = () => setRedirect(true);

  const handleSelect = selectedOption => {
    console.log('handle select', level);

    props
      .storeSelectedBrand(selectedOption)
      .then(res => {
        console.log('}}}}}}}}}}}}}}}}}}}}}}}', props.selectedBrand);
        setSelectedValue(res);
      })
      .catch(err => alert(err))
      .finally(() => console.log('´´´´´´´´´´´´´´´´´', props.selectedBrand));

    /**
     * de acordo com cada nivel de acao, chamar uma action
     */
  };

  const handleNext = e => {
    /**
     * verificar aqui qual é o nível de ação e disparar um a atualização da store
     */

    const prevLevel = level;
    const nextLevel = level + 1;

    const limitLevel = Object.keys(QUESTIONS).length;

    if (nextLevel > limitLevel) {
      return console.log('~~~~~~~', 'mostrar a tela de conclusao');
    }

    setIsLoading(true);

    props
      .getCarModels()
      .then(res => {
        /**
         * O problema está aqui
         * Eu deveria já ter acesso à store, no entanto, neste momento,
         * a props.models está pegando o estado anterior
         */
        console.log(
          '============ TEM QUE VIR OS MODELOS DE CARROS ==============',
          props.mobi,
          props.models,
          res
        );

        debugger;
        setLevel(nextLevel);
        setOptions(props.models);
        setIsLoading(false);
      })
      .catch(err => {
        debugger;
      });
  };

  useEffect(() => {
    console.log('EFEITO', level, props.selectedBrand, props.mobi);
    if (!props.mobi.brands.length) {
      return props.history.push('/');
    }
  });

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <div className="wrapper">
        <h1 className="default-mb">{QUESTIONS[level]}</h1>

        <form onSubmit={e => e.preventDefault()}>
          <Select
            className="default-mb"
            value={selectedValue}
            onChange={handleSelect}
            options={options}
          />

          {isLoading ? (
            <LoaderComponent type="CradleLoader" />
          ) : (
            <div className="buttons">
              <button onClick={handleReset}>Reset</button>
              <button type="submit" onClick={handleNext}>
                Próxima
              </button>
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};

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
