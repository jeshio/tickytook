import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './globalImports';
import Main from './pages/Main';
import store from './store';
import currentTheme from './themes/default';

export default () => (
  <Provider store={store}>
    <ThemeProvider theme={currentTheme}>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  </Provider>
);
