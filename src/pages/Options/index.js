import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';

import LoaderComponent from '@components/Loader';
import {
  storeSelectedBrand,
  getCarModels,
  getYears,
  storeSelectedModel,
  getValue,
  storeSelectedYear,
} from '@actions/mobi';

import { Container } from '@styles/style';

const Options = props => {
  const [level, setLevel] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterview, setIsInterview] = useState(true);
  const [options, setOptions] = useState([]);

  const GLOSARY = {
    1: {
      QUESTION: 'Selecione a marca do veículo',
      SET_OPTIONS: () => setOptions(props.brands),
      NEXT_LIST: level => callGetCarModels(level),
      STORE_SELECTED: selectedOption => storeBrand(selectedOption),
    },
    2: {
      QUESTION: 'Selecione o modelo do veículo',
      SET_OPTIONS: () => setOptions(props.models),
      NEXT_LIST: level => callGetYears(level),
      STORE_SELECTED: selectedOption => storeModel(selectedOption),
    },
    3: {
      QUESTION: 'Selecione o ano do veículo',
      SET_OPTIONS: () => setOptions(props.years),
      NEXT_LIST: level => callGetValue(level),
      STORE_SELECTED: selectedOption => storeYear(selectedOption),
    },
    4: {
      QUESTION: 'Valor do veículo',
      SET_OPTIONS: () => presentValue(),
    },
  };

  const handleReset = () => setRedirect(true);

  const handleError = ({ message }) => {
    alert(message);
    setIsLoading(false);
  };

  const handleSelect = selectedOption => GLOSARY[level].STORE_SELECTED(selectedOption);

  const storeBrand = selectedOption =>
    props
      .storeSelectedBrand(selectedOption)
      .then(setSelectedValue)
      .catch(handleError);

  const storeModel = selectedOption =>
    props
      .storeSelectedModel(selectedOption)
      .then(setSelectedValue)
      .catch(handleError);

  const storeYear = selectedOption =>
    props
      .storeSelectedYear(selectedOption)
      .then(setSelectedValue)
      .catch(handleError);

  const handleNext = e => {
    setIsLoading(true);
    GLOSARY[level].NEXT_LIST(level);
  };

  const callGetCarModels = level =>
    props
      .getCarModels()
      .then(() => {
        setLevel(level + 1);
        setIsLoading(false);
        setSelectedValue(null);
      })
      .catch(handleError);

  const callGetYears = level =>
    props
      .getYears()
      .then(() => {
        setLevel(level + 1);
        setIsLoading(false);
        setSelectedValue(null);
      })
      .catch(handleError);

  const callGetValue = level =>
    props
      .getValue()
      .then(() => {
        setLevel(level + 1);
        setIsLoading(false);
        setSelectedValue(null);
      })
      .catch(handleError);

  const presentValue = () => {
    console.log(props.value);
    setIsInterview(false);
  };

  useEffect(() => {
    if (!props.brands.length) {
      return props.history.push('/');
    }

    GLOSARY[level].SET_OPTIONS();
  });

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <Container>
      <div className="wrapper">
        {isInterview && (
          <Fragment>
            <h1 className="default-mb">{GLOSARY[level].QUESTION}</h1>
            <form onSubmit={e => e.preventDefault()}>
              <Select
                className="default-mb"
                value={selectedValue}
                onChange={handleSelect}
                options={options}
              />

              {isLoading && <LoaderComponent type="CradleLoader" />}

              {!isLoading && (
                <div className="buttons">
                  <button onClick={handleReset}>Reset</button>
                  <button type="submit" onClick={handleNext}>
                    Próxima
                  </button>
                </div>
              )}
            </form>
          </Fragment>
        )}

        {!isInterview && (
          <Fragment>
            <h1 className="default-mb">Veja os dados do veículo selecionado</h1>

            <div>
              <p>Marca: {props.value.Marca}</p>
              <p>Modelo: {props.value.Modelo}</p>
              <p>Ano/Modelo: {props.value.AnoModelo}</p>
              <p>Combustível {props.value.Combustivel}</p>
              <p>
                Valor: {props.value.Valor}{' '}
                <span style={{ fontSize: 10 }}>
                  (mês de referência: {props.value.MesReferencia})
                </span>
              </p>
            </div>
            <div className="buttons">
              <button onClick={handleReset}>Reset</button>
            </div>
          </Fragment>
        )}
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
  getYears: PropTypes.func,
  storeSelectedModel: PropTypes.func,
  years: PropTypes.arrayOf(PropTypes.object),
  getValue: PropTypes.func,
  storeSelectedYear: PropTypes.func,
  value: PropTypes.object,
};

const mapStateToProps = ({ mobi }) => ({
  brands: mobi.brands,
  selectedBrand: mobi.selectedBrand,
  models: mobi.models,
  years: mobi.years,
  value: mobi.value,
});

const mapDispatchToProps = {
  storeSelectedBrand,
  getCarModels,
  getYears,
  storeSelectedModel,
  getValue,
  storeSelectedYear,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options);
