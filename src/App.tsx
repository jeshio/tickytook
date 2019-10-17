import React from 'react';
import { Frontload } from 'react-frontload';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ThemeProvider } from 'styled-components';

import './globalImports';
import Main from './pages/Main';
import currentTheme from './themes/default';

export default ({ store }: { store: Store }) => {
  return (
    <Frontload>
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <Main />
        </ThemeProvider>
      </Provider>
    </Frontload>
  );
};
