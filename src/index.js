import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import configureStore from './store';

import Home from '@pages/home';
import User from '@pages/user';
import './assets/styles/main.css';

const store = configureStore();
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" exact component={User} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

module.hot.accept();
