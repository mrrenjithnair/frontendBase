import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './configure-store';
import { Container } from './counter/container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './modules/app/routes'
import './index.css';

const App = () => (
  <Provider 
  store={store}>
    <Routes />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
