import createSagaMiddleware from '@redux-saga/core';
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import { createLogger } from 'redux-logger';
import { rootReducer, rootSaga } from './rootStore';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => never;
  }
}

const getStore = (initialState = {}) => {
  const enhancers = [] as Array<() => void>;
  const middlewares: any[] = [];
  const sagaMiddleware = createSagaMiddleware();

  middlewares.push(sagaMiddleware);

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || {};

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }

    const logger = createLogger();
    middlewares.push(logger);
  }

  const composedEnhancers: StoreEnhancer<{}, {}> = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  const store = createStore(rootReducer, initialState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default getStore;
